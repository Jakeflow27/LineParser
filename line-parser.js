var fs = require('fs');
var path = require('path');

function LineParser(filepath, options) {
    if (!options){options={}}
    filepath = path.normalize(filepath);
    var line = "";
    var lineNumber = 0;
    var totalLines = 0;
    var encoding = options.encoding || 'utf8'; //['utf8', 'base64', 'ascii']

    var file = fs.createReadStream(filepath,encoding);

    function nextByte(callback) {
        return file.read(1);
    }
    var lastLine = "";
    function lineBuilder(callback){
        var byte = nextByte();
        switch (byte) {
            case "\n":
                lineNumber++;
                lastLine=line;
                line = "";
                callback(lastLine, lineNumber);
                break;
            case "\r":
                var secondByte = nextByte();
                if (secondByte == "\n") {
                    // found a windows newline, \r\n
                    lineNumber++;
                    lastLine=line;
                    line = "";
                    callback(lastLine, lineNumber);
                }
                else {
                    // It's a new line but we need to go back one byte
                    lineNumber++;
                    lastLine=line;
                    line=secondByte;
                    callback(lastLine, lineNumber);
                }
                break;
            case "\u0000":
                // console.log('eof');
                callback(-1, -1); // no more bytes
                break;
            case null:
                // console.log('eof');
                callback(-1, -1); // no more bytes
                break;
            default:
                line=line.concat(byte);
                lineBuilder(callback); // sorry this isn't a line yet, try again
        }

    }

    function nextLine(callback) {
        // return new Promise(function(resolve,reject){
        //
        // })
        lineBuilder(callback)
    }

    function countLines(callback) {
        var i;
        fs.createReadStream(filepath,{autoClose:true})
            .on('data', function (chunk) {
                for (i = 0; i < chunk.length; ++i)
                    if (chunk[i] == 10) totalLines++;
            })
            .on('close', function () {
                callback(totalLines);
            });
    }

    function forEachLine(modifier) {
            return new Promise(function(resolve,reject){
                function mod(line, ln) {
                    if (line == -1) {
                        resolve();
                    }
                    else {
                        modifier(line, ln, function () {
                            nextLine(mod)
                        })
                    }
                }
                nextLine(mod)
            })
    }

    this.nextLine = nextLine;
    this.countLines = countLines;
    this.forEachLine = forEachLine;
}

module.exports = LineParser;
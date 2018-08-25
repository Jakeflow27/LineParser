var fs = require('fs');
var path = require('path');

function LineParser(filepath, options, callback) {
    var self = this;
    if (!options){options={}}
    filepath = path.normalize(filepath);
    var line = "";
    var lineNumber = 0;
    var totalLines = 0;
    var encoding = options.encoding || 'utf8'; //['utf8', 'base64', 'ascii']
    var file = fs.openSync(filepath, 'r');
    var backlog = [];
    var reading = false;

    function getBytes(numberOfBytes, callback) {
        //fs.read(fd, buffer, offset, length, position, callback)
        fs.read(file, new Buffer(numberOfBytes), 0, numberOfBytes, null, callback);
        // callback(err, numberOfBytes, data)
    }

    function nextByte(callback) {
        // get 1 byte and add the result to the line buffer
        getBytes(1, function (err, num, data) {
            if (err) {
                throw err
            }
            data = data.toString(encoding);
            line = line.concat(data);
            callback(data);
        });
    }

    function goBack(callback) {
        // delete the last byte
        line = line.slice(0, line.length - 1);
        fs.read(file, null, 0, 0, -1);
        // nextLine(callback);
        callback(line, lineNumber);
    }

    // a list of callback related to the line numbers.
    function processBacklog(callback){
        if(backlog.length>0){
            lineBuilder(backlog.shift());
        }
    }

    function lineBuilder(callback){
        reading=true;
        nextByte(function (byte) {
            switch (byte) {
                case "\n":
                    lineNumber++;
                    callback(line.slice(0, -1), lineNumber);
                    line = "";
                    reading=false;
                    processBacklog();
                    break;
                case "\r":
                    nextByte(function (byteTwo) {
                        if (byteTwo == "\n") {
                            // found a windows newline, \r\n
                            lineNumber++;
                            callback(line.slice(0, -2), lineNumber);
                            line = "";
                            reading=false;
                            processBacklog();
                        }
                        else {
                            // It's a new line but we need to go back one byte
                            lineNumber++;
                            goBack(callback)
                            reading=false;
                            processBacklog();
                        }
                    })
                    break;
                case "\u0000":
                    // console.log('eof');
                    callback(-1, -1); // no more bytes
                    break;
                default:
                    lineBuilder(callback); // sorry this isn't a line yet, try again
            }

        });
    }

    function nextLine(callback) {
        // go through each byte one by one until we find a new line character.
        if(reading){
            backlog.push(callback);
        }
        else{
            lineBuilder(callback)
        }
        reading = true;

    }

    function countLines(callback) {
        var i;
        require('fs').createReadStream(filepath)
            .on('data', function (chunk) {
                for (i = 0; i < chunk.length; ++i)
                    if (chunk[i] == 10) totalLines++;
            })
            .on('end', function () {
                callback(totalLines);
            });
    }

    function forEachLine(modifier, callback) {
        nextLine(function (line, ln) {
            if (line == -1) {
                // this is the eof
                if(!callback){callback=self.callback}
                if (callback) {
                    callback()
                }
            }
            else {
                modifier(line, ln, function () {
                    forEachLine(modifier, callback)
                })
            }
        });
        return self; // allows the .then function to be called from forEachLine.then
    }
    this.then = function then(after) {if (after) {callback = after;}}
    this.nextLine = nextLine;
    this.countLines = countLines;
    this.forEachLine = forEachLine;
}

module.exports = LineParser;
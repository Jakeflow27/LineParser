var fs = require('fs');
var path = require('path');

function LineParser(filepath, options) {
    var self = this;
    if (!options){options={}}
    filepath = path.normalize(filepath);
    var line = "";
    var totalLines = 0;
    var encoding = options.encoding || 'utf8'; //['utf8', 'base64', 'ascii']

    var file = fs.createReadStream(filepath,encoding);

    function nextByte(callback) {
        return file.read(1);
    }

    var ln=0;
    var lastLine = "";
    var lagByte=""; // forgot to add this
    // eventually this recursive function returns {line:lineData,ln:lineNumber}
    function nextLine(line){
        var byte = nextByte();
        if(!line){line=""}
        if(lagByte){
            line=line.concat(lagByte);
            lagByte=null;
        }
        switch (byte) {
            case "\n":
                ln++;
                return {line:line,ln:ln}
                break;
            case "\r":
                var secondByte = nextByte();
                if (secondByte == "\n") {
                    // found a windows newline, \r\n
                    ln++;
                    return {line:line,ln:ln}
                }
                else {
                    // It's a new line but we need to go back one byte
                    ln++;
                    lagByte=byte;
                    return {line:line,ln:ln}
                }
                break;
            case "\u0000":
                // console.log('eof');
                return {line:-1,ln:-1} // no more bytes
                break;
            case null:
                // console.log('eof');
                return {line:-1,ln:-1}  // no more bytes
                break;
            default:
                line=line.concat(byte);
                return nextLine(line); // sorry this isn't a line yet, try again
        }

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

    var stats;

    async function forEachLine(modifier) {
        if(!stats){
            stats = {}
            stats.start = new Date().getTime();
        }

        var ldata = await nextLine("");

        if (ldata.line == -1 && ldata.ln == -1){
            // this signals we're at the last line
            stats.end=  new Date().getTime();
            stats.duration = ( stats.end - stats.start ) / 1000;
            return stats;
        }
        else{
            await modifier(ldata);
            return forEachLine(modifier);
        }
    }

    this.nextLine = nextLine;
    this.countLines = countLines;
    this.forEachLine = forEachLine;
}

module.exports = LineParser;
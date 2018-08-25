var fs = require('fs');
var path = require('path');

function LineParser(filepath, options, callback) {
    var callback = callback;
    var self = this;
    if (!options){options={}}
    filepath = path.normalize(filepath);
    var line = "";
    var lineNumber = 0;
    var totalLines = 0;
    var encoding = options.encoding || 'utf8'; //['utf8', 'base64', 'ascii']
    var file = fs.openSync(filepath, 'r');
    var reading = false;

    // function parse2(){
    //     var readable = fs.createReadStream(filepath,encoding);
    //     var backlog = [];
    //     var reading = false;
    //     readable.pause();
    //
    //     readable.on('data',function(chunk){
    //         readable.pause();
    //         readable.resume();
    //     })
    // }

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

    function getLine(){
        var line = fs.WritableStream();
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
            // return new Promise(function(resolve,reject){

                function mod(line, ln) {
                    if (line == -1) {
                        // resolve()
                        if(callback){callback()}
                    }
                    else {
                        modifier(line, ln, function () {
                            nextLine(mod)
                        })
                    }
                }
                
                nextLine(mod)
        // })
    }

    this.nextLine = nextLine;
    this.countLines = countLines;
    this.forEachLine = forEachLine;
}

module.exports = LineParser;
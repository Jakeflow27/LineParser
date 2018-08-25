var LineParser = require('./line-parser');

// Example:

function example1(){
    const lp = new LineParser("README.md", {encoding: "utf8"});
    lp.countLines(function (count) {
        console.log("Total lines:", count);

        lp.nextLine(function (line, lineNumber) {
            console.log("processed line", lineNumber, "of", count); // good for progress bars etc
            console.log("This is the first line:", JSON.stringify(line));
            console.log('doing a bunch of stuff for the line');
            lp.nextLine(function (line, lineNumber) {
                console.log('checking line', lineNumber);
                lp.forEachLine(function (line, ln, next) {
                    console.log('processing ln #', ln, JSON.stringify(line));
                    next();
                }).then(function () {
                    console.log('processed all the lines')
                    lp.nextLine(function(line,ln){
                        console.log('no more lines',line,ln)
                    })
                })
            })
        })

    })
}

function example2(){
    const lp = new LineParser("README.md", {encoding: "utf8"});
    lp.countLines(function(count){
        console.log("checking",count,"lines");
        lp.forEachLine(function(line,ln,next){
            console.log(ln,line);
            next();
        }).then(function(){
            console.log('it is fin');
        })
    })
}

example2();



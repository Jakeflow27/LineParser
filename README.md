Line-Parser
=
Stream a file byte by byte and process each line. Each line is loaded as it's needed

### Install and use this branch

    npm install Jakeflow27/LineParser
### Process a single line
    var LineReader = require('linereader');
    var lp = new LineParser("text-file.log", {encoding: "utf8"});
    lp.nextLine(function(line,lineNumber){
        // do something
    })
    lp.nextLine(function(line,lineNumber){
        // get another line
    })
    
### Process all lines

    var LineParser = require('./line-parser');
    
    var lp = new LineParser("README.md", {encoding: "utf8"});
    lp.forEachLine(function(line,ln,next){
        console.log('processing ln #', ln, line);
        next();
    }).then(function(){
        console.info('fin');
    })


### Example
    var LineParser = require('./line-parser');
    
    // Example:
    const lp = new LineParser("README.md", {encoding: "utf8"});
    
    lp.countLines(function (count) {
        console.log("Total lines:", count);
    
        lp.nextLine(function (line, lineNumber) {
            console.log("processed line", lineNumber, "of", count); // good for progress bars etc
            console.log("This is the first line:", JSON.stringify(line));
            console.log('doing a bunch of stuff for the line');
            lp.nextLine(function(line,lineNumber){
                console.log('checking line',lineNumber);
                lp.forEachLine(function(line,ln,next){
                    console.log('processing ln #',ln, JSON.stringify(line));
                    next();
                }).then(function(){
                    console.log('processed all the lines')
                })
            })
        })
    
    })
    
    OUTPUT:
    
    Total lines: 60
    processed line 1 of 60
    This is the first line: "Line-Parser"
    doing a bunch of stuff for the line
    checking line 2
    processing ln # 3 "Stream a file byte by byte and process each line. Each line is loaded as it's needed"
    processing ln # 4 ""
    processing ln # 5 "### Install and use this branch"
    processing ln # 6 ""
    processing ln # 7 "    npm install Jakeflow27/LineParser"
    processing ln # 8 ""
    processing ln # 9 "### Process a single line"
    processing ln # 10 "    var LineReader = require('linereader');"
    processing ln # 11 "    var lp = new LineParser(\"text-file.log\", {encoding: \"utf8\"});"
    processing ln # 12 "    lp.nextLine(function(line,lineNumber){"
    processing ln # 13 "        // do something"
    processing ln # 14 "    })"
    processing ln # 15 "    lp.nextLine(function(line,lineNumber){"
    processing ln # 16 "        // get another line"
    processing ln # 17 "    })"
    processing ln # 18 "    "
    processing ln # 19 "### Process all lines"
    processing ln # 20 ""
    processing ln # 21 "    var LineParser = require('./line-parser');"
    processing ln # 22 "    "
    processing ln # 23 "    var lp = new LineParser(\"README.md\", {encoding: \"utf8\"});"
    processing ln # 24 "    lp.forEachLine(function(line,ln,next){"
    processing ln # 25 "        console.log('processing ln #', ln, line);"
    processing ln # 26 "        next();"
    processing ln # 27 "    }).then(function(){"
    processing ln # 28 "        console.info('fin');"
    processing ln # 29 "    })"
    processing ln # 30 ""
    processing ln # 31 ""
    processing ln # 32 "### Example"
    processing ln # 33 "    var LineParser = require('./line-parser');"
    processing ln # 34 "    "
    processing ln # 35 "    // Example:"
    processing ln # 36 "    const lp = new LineParser(\"README.md\", {encoding: \"utf8\"});"
    processing ln # 37 "    "
    processing ln # 38 "    lp.countLines(function (count) {"
    processing ln # 39 "        console.log(\"Total lines:\", count);"
    processing ln # 40 "    "
    processing ln # 41 "        lp.nextLine(function (line, lineNumber) {"
    processing ln # 42 "            console.log(\"processed line\", lineNumber, \"of\", count); // good for progress bars etc"
    processing ln # 43 "            console.log(\"This is the first line:\", JSON.stringify(line));"
    processing ln # 44 "            console.log('doing a bunch of stuff for the line');"
    processing ln # 45 "            lp.nextLine(function(line,lineNumber){"
    processing ln # 46 "                console.log('checking line',lineNumber);"
    processing ln # 47 "                lp.forEachLine(function(line,ln,next){"
    processing ln # 48 "                    console.log('processing ln #',ln, JSON.stringify(line));"
    processing ln # 49 "                    next();"
    processing ln # 50 "                }).then(function(){"
    processing ln # 51 "                    console.log('processed all the lines')"
    processing ln # 52 "                })"
    processing ln # 53 "            })"
    processing ln # 54 "        })"
    processing ln # 55 "    "
    processing ln # 56 "    })"
    processing ln # 57 "    "
    processing ln # 58 "    OUTPUT:"
    processing ln # 59 "    "
    processing ln # 60 ""
    processed all the lines
    
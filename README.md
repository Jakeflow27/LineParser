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
    Total lines: 58
    processed line 1 of 58
    This is the first line: "Line-Parser"
    doing a bunch of stuff for the line
    checking line 2
    processing ln # 3 "Stream a file byte by byte and process each line. Each line is loaded as it's needed"
    processing ln # 4 ""
    processing ln # 5 "### Install and use this branch"
    processing ln # 6 ""
    processing ln # 7 "    npm install Jakeflow27/LineParser"
    processing ln # 8 "### Process a single line"
    processing ln # 9 "    var LineReader = require('linereader');"
    processing ln # 10 "    var lp = new LineParser(\"text-file.log\", {encoding: \"utf8\"});"
    processing ln # 11 "    lp.nextLine(function(line,lineNumber){"
    processing ln # 12 "        // do something"
    processing ln # 13 "    })"
    processing ln # 14 "    lp.nextLine(function(line,lineNumber){"
    processing ln # 15 "        // get another line"
    processing ln # 16 "    })"
    processing ln # 17 "    "
    processing ln # 18 "### Process all lines"
    processing ln # 19 ""
    processing ln # 20 "    var LineParser = require('./line-parser');"
    processing ln # 21 "    "
    processing ln # 22 "    var lp = new LineParser(\"README.md\", {encoding: \"utf8\"});"
    processing ln # 23 "    lp.forEachLine(function(line,ln,next){"
    processing ln # 24 "        console.log('processing ln #', ln, line);"
    processing ln # 25 "        next();"
    processing ln # 26 "    }).then(function(){"
    processing ln # 27 "        console.info('fin');"
    processing ln # 28 "    })"
    processing ln # 29 ""
    processing ln # 30 ""
    processing ln # 31 "### Example"
    processing ln # 32 "    var LineParser = require('./line-parser');"
    processing ln # 33 "    "
    processing ln # 34 "    // Example:"
    processing ln # 35 "    const lp = new LineParser(\"README.md\", {encoding: \"utf8\"});"
    processing ln # 36 "    "
    processing ln # 37 "    lp.countLines(function (count) {"
    processing ln # 38 "        console.log(\"Total lines:\", count);"
    processing ln # 39 "    "
    processing ln # 40 "        lp.nextLine(function (line, lineNumber) {"
    processing ln # 41 "            console.log(\"processed line\", lineNumber, \"of\", count); // good for progress bars etc"
    processing ln # 42 "            console.log(\"This is the first line:\", JSON.stringify(line));"
    processing ln # 43 "            console.log('doing a bunch of stuff for the line');"
    processing ln # 44 "            lp.nextLine(function(line,lineNumber){"
    processing ln # 45 "                console.log('checking line',lineNumber);"
    processing ln # 46 "                lp.forEachLine(function(line,ln,next){"
    processing ln # 47 "                    console.log('processing ln #',ln, JSON.stringify(line));"
    processing ln # 48 "                    next();"
    processing ln # 49 "                }).then(function(){"
    processing ln # 50 "                    console.log('processed all the lines')"
    processing ln # 51 "                })"
    processing ln # 52 "            })"
    processing ln # 53 "        })"
    processing ln # 54 "    "
    processing ln # 55 "    })"
    processing ln # 56 "    "
    processing ln # 57 "    OUTPUT:"
    processing ln # 58 "    "
    processed all the lines
    
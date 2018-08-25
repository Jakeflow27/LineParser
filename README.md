Line-Parser
=
Stream a file byte by byte and process each line. Each line is loaded as it's needed

### Install and use this branch

    npm install Jakeflow27/LineParser
### Process a single line
    var LineParser = require('line-parser');
    var lp = new LineParser("text-file.log", {encoding: "utf8"});
    lp.nextLine(function(line,lineNumber){
        // do something
    })
    lp.nextLine(function(line,lineNumber){
        // get another line
    })
    
### Process all lines

    var LineParser = require('line-parser');
    
    var lp = new LineParser("README.md", {encoding: "utf8"});
    lp.forEachLine(function(line,ln,next){
        console.log('processing ln #', ln, line);
        next();
    }).then(function(){
        console.info('fin');
    })


### Example
    var LineParser = require('line-parser');
    
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
    
    --------------------------------------------
                       OUTPUT:
    --------------------------------------------
    checking 59 lines
    1 'Line-Parser'
    2 '='
    3 'Stream a file byte by byte and process each line. Each line is loaded as it\'s needed'
    4 ''
    5 '### Install and use this branch'
    6 ''
    7 '    npm install Jakeflow27/LineParser'
    8 '### Process a single line'
    9 '    var LineParser = require(\'line-parser\');'
    10 '    var lp = new LineParser("text-file.log", {encoding: "utf8"});'
    11 '    lp.nextLine(function(line,lineNumber){'
    12 '        // do something'
    13 '    })'
    14 '    lp.nextLine(function(line,lineNumber){'
    15 '        // get another line'
    16 '    })'
    17 '    '
    18 '### Process all lines'
    19 ''
    20 '    var LineParser = require(\'line-parser\');'
    21 '    '
    22 '    var lp = new LineParser("README.md", {encoding: "utf8"});'
    23 '    lp.forEachLine(function(line,ln,next){'
    24 '        console.log(\'processing ln #\', ln, line);'
    25 '        next();'
    26 '    }).then(function(){'
    27 '        console.info(\'fin\');'
    28 '    })'
    29 ''
    30 ''
    31 '### Example'
    32 '    var LineParser = require(\'line-parser\');'
    33 '    '
    34 '    // Example:'
    35 '    const lp = new LineParser("README.md", {encoding: "utf8"});'
    36 '    '
    37 '    lp.countLines(function (count) {'
    38 '        console.log("Total lines:", count);'
    39 '    '
    40 '        lp.nextLine(function (line, lineNumber) {'
    41 '            console.log("processed line", lineNumber, "of", count); // good for progress bars etc'
    42 '            console.log("This is the first line:", JSON.stringify(line));'
    43 '            console.log(\'doing a bunch of stuff for the line\');'
    44 '            lp.nextLine(function(line,lineNumber){'
    45 '                console.log(\'checking line\',lineNumber);'
    46 '                lp.forEachLine(function(line,ln,next){'
    47 '                    console.log(\'processing ln #\',ln, JSON.stringify(line));'
    48 '                    next();'
    49 '                }).then(function(){'
    50 '                    console.log(\'processed all the lines\')'
    51 '                })'
    52 '            })'
    53 '        })'
    54 '    '
    55 '    })'
    56 '    '
    57 '    --------------------------------------------'
    58 '                       OUTPUT:'
    59 '    --------------------------------------------'
    it is fin
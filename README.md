Line-Parser
=
Read a file byte by byte and process each line. Each line is loaded as it's needed

### Install and use this branch

    npm install Jakeflow27/LineParser
    
### Process all lines

    var LineParser = require('line-parser');
    
    var lp = new LineParser("README.md", {encoding: "utf8"});
    lp.forEachLine(function(line,ln){
        console.log('processing ln #', ln, line);
    }).then(function(){
        console.info('fin');
    })


### Example
    var LineParser = require('line-parser');
    
    // Example:
    const lp = new LineParser("README.md", {encoding: "utf8"});

    function example(){
        const lp = new LineParser("README.md", {encoding: "utf8"});
        lp.countLines(function(count){
            console.log("checking",count,"lines");
            lp.forEachLine(function(ldata){
                console.log(ldata.ln,ldata.line);
                return "done";
            }).then(function(stats){
                console.log("stats",stats);
                console.log('finished in',stats.duration,"seconds");
            })
        })
    }
    
    example();
    
    =======
    output
    =======
    checking 41 lines
    1 'Line-Parser'
    2 '='
    3 'Read a file byte by byte and process each line. Each line is loaded as it\'s needed'
    4 ''
    5 '### Install and use this branch'
    6 ''
    7 '    npm install Jakeflow27/LineParser'
    8 '    '
    9 '### Process all lines'
    10 ''
    11 '    var LineParser = require(\'line-parser\');'
    12 '    '
    13 '    var lp = new LineParser("README.md", {encoding: "utf8"});'
    14 '    lp.forEachLine(function(line,ln,next){'
    15 '        console.log(\'processing ln #\', ln, line);'
    16 '        next();'
    17 '    }).then(function(){'
    18 '        console.info(\'fin\');'
    19 '    })'
    20 ''
    21 ''
    22 '### Example'
    23 '    var LineParser = require(\'line-parser\');'
    24 '    '
    25 '    // Example:'
    26 '    const lp = new LineParser("README.md", {encoding: "utf8"});'
    27 ''
    28 '    function example(){'
    29 '        const lp = new LineParser("README.md", {encoding: "utf8"});'
    30 '        lp.countLines(function(count){'
    31 '            console.log("checking",count,"lines");'
    32 '            lp.forEachLine(function(ldata){'
    33 '                console.log(ldata.ln,ldata.line);'
    34 '                return "done";'
    35 '            }).then(function(stats){'
    36 '                console.log("stats",stats);'
    37 '                console.log(\'finished in\',stats.duration,"seconds");'
    38 '            })'
    39 '        })'
    40 '    }'
    41 '    '
    stats { start: 1535261738245, end: 1535261738252, duration: 0.007 }
    finished in 0.007 seconds
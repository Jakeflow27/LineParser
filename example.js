var LineParser = require('./line-parser');

// Example:

function example(){
    const fpath = "README.md"
    const lp = new LineParser(fpath, {encoding: "utf8"});
    lp.countLines(function(count){
        console.log("checking",count,"lines");
        lp.forEachLine(function(ldata){
            console.log(ldata.ln,ldata.line);
            return "done";
        }).then(function(stats){
            console.log("stats",stats);
            console.log("checked", stats.lines, "lines in",stats.duration,"seconds");
        })
    })
}

example();



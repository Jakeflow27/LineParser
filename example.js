var LineParser = require('./line-parser');

// Example:

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



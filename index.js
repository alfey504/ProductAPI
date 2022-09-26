var seneca = require('seneca')()

seneca.add('role:api, cmd:bazinga', function(args, done){
    done(null, {
        vasu: "patti", 
        foodul: "sudalamani"
    });
});

seneca.add('role:api, cmd:chunchunmaru', function(args, done){
    done(null, {
        asuna: "mid",
        megumin: "top tier"
    });
});

seneca.act('role:web', {use: {
    prefix: '/my-api',
    pin: {role: 'api', cmd: '*'},
    map: {
        bazinga: {GET: true},
        chunchunmaru: {GET: true}
    }
}})

var express = require('express')
var app = express()

app.use( seneca.export('web') )

app.listen(3000)
console.log("server listening at port: 3000")

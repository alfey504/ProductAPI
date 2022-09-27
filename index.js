
var plugin = function(options){
  var seneca = this;

  seneca.add({role: 'product', cmd:'add'}, (msg, respond) => {
    this.make('products').data$(msg.data).save$(respond);
  });

  seneca.add({role: 'product', cmd:'load'}, (msg, respond) => {
    this.make('products').load$(msg.data.id, respond);
  });

  seneca.add({ role: 'product', cmd: 'get-all' }, function (msg, respond) {
    this.make('products').list$({}, respond);
  });

  seneca.add({role: 'product', cmd:'delete'}, (msg, respond) => {
    this.make('products').remove$({}, respond);
  })
}

module.exports = plugin

var seneca = require('seneca')()
seneca.use(plugin);
seneca.use('seneca-entity');

var getRequestCount = 0
var postRequestCount = 0

// handling /product/get_products endpoint
seneca.add('role:api, cmd:get_products', function(args, done){
    console.log("\product\get_products      GET: Received Request");
    getRequestCount = getRequestCount+1
    console.log(getRequestCount)  
    var product = {
      id: args.id
    }
    seneca.act({role: 'product', cmd:'load', data: product}, (err, msg) => {
      if(err){
        console.log(err)
      }else{
        console.log("\product\get_products      GET: Sending Response");
        done(err, msg);
      }
    })
});

// handling /product/add_products endpoint
seneca.add('role:api, cmd:add_products', function(args, done){
    console.log("\product\add_products      POST: Received Request");
    postRequestCount = postRequestCount + 1   
    console.log(postRequestCount)

    //product data
    var product = {
      product_name: args.product_name,
      product_price: args.product_price,
      product_category: args.product_category
    }

    seneca.act({role: 'product', cmd: 'add', data: product}, (err, msg) => {
      console.log("\product\add_products      POST: Sending Response");
      done(err, msg);
    })
});

//handling endpoint /product/get_all_products
seneca.add('role:api, cmd:get_all_products', (args, done) => {
  console.log("\product\gett_all_products      GET: Received Request");
  seneca.act({role:'product', cmd:'get-all'}, (err, msg) => {
    console.log("\product\get_all_products      POST: Sending Response");
    done(err, msg)
  })
})

//handling endpoint /product/delete_products
seneca.add('role:api, cmd:delete_products', function(args, done){
  console.log("\product\delete_products      DELETE: Received Request");
  seneca.act({role: 'product', cmd: 'delete'}, (err, msg) => {
    cconsole.log("\product\delete_products      DELETE: Sending Response");
    done(err, msg);
  })
});

seneca.act('role:web', {use: {
    prefix: '\product',
    pin: {role: 'api', cmd: '*'},
    map: {
        get_products: {GET: true},
        add_products: {POST: true},
        remove_products: {DELETE: true},
        get_all_products: {GET: true}
    }
}})

var express = require('express')
var app = express()
app.use(require("body-parser").json())
app.use( seneca.export('web') )

app.listen(3000)
console.log("server is listening at http://127.0.0.1:3000")
console.log("Endpoints:")
console.log("http://127.0.0.1:3000/products/get_products?id=m488ta    method:GET")
console.log("http://127.0.0.1:3000/products/get_all_products    method:GET")
console.log("http://127.0.0.1:3000/products/add_products?    method:POST")
console.log("http://127.0.0.1:3000/products/remove_products    method:DELETE")

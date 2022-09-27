var plugin = function (options) {
	var seneca = this;

<<<<<<< HEAD
	// Adding data to seneca entity
=======
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
	seneca.add({
		role: 'product',
		cmd: 'add'
	}, (msg, respond) => {
		this.make('products').data$(msg.data).save$(respond);
	});

<<<<<<< HEAD
	// Loading data based on id from seneca entity
=======
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
	seneca.add({
		role: 'product',
		cmd: 'load'
	}, (msg, respond) => {
		this.make('products').load$(msg.data.product_id, respond);
	});

<<<<<<< HEAD
	// Getting all the data from seneca entity 
=======
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
	seneca.add({
		role: 'product',
		cmd: 'get-all'
	}, function (msg, respond) {
		this.make('products').list$({}, respond);
	});

<<<<<<< HEAD
	// removing product from the seneca entity
=======
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
	seneca.add({
		role: 'product',
		cmd: 'delete'
	}, (msg, respond) => {
		this.make('products').remove$({}, respond);
	})
}

module.exports = plugin

var seneca = require('seneca')()
seneca.use(plugin);
seneca.use('seneca-entity');

var getRequestCount = 0
var postRequestCount = 0
var deleteRequestCount = 0

// handling /product/get_products endpoint
seneca.add('role:api, cmd:get_products', function (args, done) {
<<<<<<< HEAD
	getRequestCount = getRequestCount + 1
	console.log("Processed Request Count --> GET:" + getRequestCount + ", POST:" + postRequestCount + ", DELETE:" + deleteRequestCount)
	console.log(" \product\get_products      GET: Received Request");
=======
	console.log(" \product\get_products      GET: Received Request");
	getRequestCount = getRequestCount + 1
	console.log(getRequestCount)
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
	var product = {
		product_id: args.product_id
	}
	seneca.act({
		role: 'product',
		cmd: 'load',
		data: product
	}, (err, msg) => {
		if (err) {
			console.log(err)
		} else {
			console.log("\\product\\get_products      GET: Sending Response");
			done(err, msg);
		}
	})
});

// handling /product/add_products endpoint
seneca.add('role:api, cmd:add_products', function (args, done) {
<<<<<<< HEAD
	postRequestCount = postRequestCount + 1
	console.log("Processed Request Count --> GET:" + getRequestCount + ", POST:" + postRequestCount + ", DELETE:" + deleteRequestCount)
	console.log("\\product\\add_products      POST: Received Request");
	//product data
	var product = {
		product_name: args.product_name,
		product_price: args.product_price,
		product_category: args.product_category
	}

=======
	console.log("\\product\\add_products      POST: Received Request");
	postRequestCount = postRequestCount + 1
	console.log(postRequestCount)

	//product data
	var product = {
		product_name: args.product_name,
		product_price: args.product_price,
		product_category: args.product_category
	}

>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
	seneca.act({
		role: 'product',
		cmd: 'add',
		data: product
	}, (err, msg) => {
<<<<<<< HEAD
		if (err) {
			console.log(err)
		} else {
			console.log("\\product\\add_products      POST: Sending Response");
			done(err, msg);
		}
=======
		console.log("\\product\\add_products      POST: Sending Response");
		done(err, msg);
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
	})
});

//handling endpoint /product/get_all_products
seneca.add('role:api, cmd:get_all_products', (args, done) => {
<<<<<<< HEAD
	getRequestCount = getRequestCount + 1
	console.log("Processed Request Count --> GET:" + getRequestCount + ", POST:" + postRequestCount + ", DELETE:" + deleteRequestCount)
	console.log(" \product\get_all_products      GET: Received Request");
=======
	console.log("\product\gett_all_products      GET: Received Request");
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
	seneca.act({
		role: 'product',
		cmd: 'get-all'
	}, (err, msg) => {
<<<<<<< HEAD
		if (err) {
			console.log(err)
		} else {
			console.log("\product\get_all_products      GET: Sending Response");
			done(err, msg)
		}
=======
		console.log("\product\get_all_products      POST: Sending Response");
		done(err, msg)
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
	})
})

//handling endpoint /product/delete_products
seneca.add('role:api, cmd:remove_products', function (args, done) {
<<<<<<< HEAD
	deleteRequestCount = deleteRequestCount + 1
	console.log("Processed Request Count --> GET:" + getRequestCount + ", POST:" + postRequestCount + ", DELETE:" + deleteRequestCount)
=======
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
	console.log("\product\remove_products      DELETE: Received Request");
	seneca.act({
		role: 'product',
		cmd: 'get-all'
	}, (err, msg) => {
		if (err) {
			console.log(err)
		} else {
<<<<<<< HEAD
			var finalmsg = {}
=======
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
			msg.forEach(m => {
				console.log(m)
				seneca.act({
					role: 'product',
					cmd: 'delete'
				}, (err, msg) => {
<<<<<<< HEAD
					if (err) {
						console.log(err);
					} else {
						finalmsg.push(msg);
						console.log(msg);
					}
				})
			});
			console.log(finalmsg)
			done(err, finalmsg);
=======
					console.log("deleted");
				})
		
			});
			done(err, msg);
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
		}
	})

});

seneca.act('role:web', {
	use: {
		prefix: '\product',
		pin: {
			role: 'api',
			cmd: '*'
		},
		map: {
			get_products: {
				GET: true
			},
			add_products: {
				POST: true
			},
			remove_products: {
				DELETE: true
			},
			get_all_products: {
				GET: true
			}
		}
	}
})

var express = require('express')
var app = express()
app.use(require("body-parser").json())
app.use(seneca.export('web'))

app.listen(3000)
console.log("server is listening at http://127.0.0.1:3000")
console.log("Endpoints:")
console.log("http://127.0.0.1:3000/products/get_products?id=m488ta    method:GET")
console.log("http://127.0.0.1:3000/products/get_all_products    method:GET")
<<<<<<< HEAD
console.log("http://localhost:3000/product/add_products?product_name=ASUS Rog&product_price=2000&product_category=Computers   method:POST")
=======
console.log("http://127.0.0.1:3000/products/add_products?    method:POST")
>>>>>>> ec45d88349ef508fb54a25c735f0917f54f7c3c8
console.log("http://127.0.0.1:3000/products/remove_products    method:DELETE")
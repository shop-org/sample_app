var express = require('express');
var models = require('..//models/storeModel');
var Store = models.Store;
var UserSearch = require('..//models/user_search');
var storeRouter = express.Router();
var commons = require('./commonRouteFunctions');

storeRouter.use(function(req,res,next){
	console.log("store");
	console.log(req.method,req.url);
	next();
});

storeRouter.route('/store')
	.post(function (req,res) {
		var store = new Store();
		var recData = req.body;
		store.name = recData.name;
		var city_name = recData.address.city;
		store.address = recData.address;
		store.category = recData.category; //make sure its an array of categories
		store.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success:false,'message':'User already exists'});
				}
				else{
					return res.send(err)
				}
			}
			commons.saveSearchList(req.body.name,"store",city_name,req,res);
			for (var i = store.category.length - 1; i >= 0; i--) {
				commons.saveSearchList(store.category[i],"store-category",city_name,req,res);
			};

			res.json({message:"Store created"});
		});
	})
storeRouter.route('/cities')
	.get(function(req,res){
		UserSearch.find(function(err,cities){
			console.log("yo");
			if(err){
				console.log(err);
				res.send(err);
			}
			console.log("cities route yo");
			console.log(cities);
			res.json(cities);
			//res.render("stores",{"stores":stores});
		}).select({ "location": 1, "_id": 0});
	})

storeRouter.route('/storesCollection/stores/:location/:pageNo')
	.get(function(req,res){
		Store.paginate({'address.city':req.params.location},
			{page: req.params.pageNo, limit: 3}, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.json(result);
			}
		});
	})
	.post(function(req,res){
		var store = new Store();
		var recData = req.body;
		store.name = recData.name;
		var city_name = recData.address.city;
		store.address = recData.address;
		store.category = recData.category; //make sure its an array of categories
		store.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success:false,'message':'User already exists'});
				}
				else{
					return res.send(err)
				}
			}
			commons.saveSearchList(req.body.name,"store",city_name,req,res);
			for (var i = store.category.length - 1; i >= 0; i--) {
				commons.saveSearchList(store.category[i],"store-category",city_name,req,res);
			};

			res.json({message:"Store created"});
		});
	});
storeRouter.route('/storesCollection/storeName/:storeName/:location/:pageNo')
	.get(function(req,res){
		Store.paginate({'name':req.params.storeName,'address.city':req.params.location},
			{page: req.params.pageNo, limit: 1 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.json(result);
			}
		});

	});
storeRouter.route('/storesCollection/category/:category/:location/:pageNo')
	.get(function(req,res){
		Store.paginate({'category':req.params.category,'address.city':req.params.location},
			{page: req.params.pageNo, limit: 1 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.json(result);
			}
		});

	});

storeRouter.route('/categories/:pageNo')
	.get(function(req,res){
		Store.paginate({
			/*category: { $in: ['category1'] }*/
		}, { select:'category', page: req.params.pageNo, limit: 2 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				// result.docs
		    // result.total
		    // result.limit - 10
		    // result.page - 3
		    // result.pages
				console.log(result);
				res.json(result);
			}
		});
		/*
		Store.find({},{category:1},function(err,categories){
			if(err){
				res.send(err);
			}
			else{
				console.log(categories);
				res.json(categories);
			}
		})*/
	})
storeRouter.route('/singleStore/:store_id/:slug?')
	.get(function(req,res){
		Store.findById(req.params.store_id,function(err,store){
			if(err){
				res.send(err);
			}
			else{
				res.json(store);
			}
		})
	})
	/*.put(function(req,res){
		User.findById(req.params.user_id,function(err,user){
			if(err){
				res.send(err);
			}
			if(req.body.name){
				user.name = req.body.name;
			}
			if(req.body.username){
				user.username = req.body.username;
			}
			if(req.body.password){
				user.password = req.body.password;
			}
			if(req.body.address){
				console.log("address getting updated");
				user.address = req.body.address;
			}
			user.save(function(err){
				if(err){
					res.send(err);
				}
				res.json({message:"user updated"});
			})
		})
	})*/
module.exports = storeRouter;

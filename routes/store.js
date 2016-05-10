var express = require('express');
var Store = require('..//models/storeModel');
var UserSearch = require('..//models/user_search');
var storeRouter = express.Router();

storeRouter.use(function(req,res,next){
	console.log("store");
	console.log(req.method,req.url);
	next();
});

var saveSearchList = function(query,kind,location,req,res){
	var userSearch = new UserSearch();
		var delimiter = "#&#";
		userSearch.userSearchString = query+delimiter+kind+delimiter+location;
		userSearch.location = location
		userSearch.save(function(err){
			if(err){
				console.log(err)	
			}

			console.log("Search created");
		});
};
storeRouter.route('/cities')
	.get(function(req,res){
		UserSearch.find(function(err,cities){
			if(err){
				res.send(err);
			}
			console.log("cities route");
			console.log(cities);
			res.json(cities);
			//res.render("stores",{"stores":stores});
		}).select({ "location": 1, "_id": 0});
	})

storeRouter.route('/stores')
	.get(function(req,res){
		Store.find(function(err,stores){
			if(err){
				res.send(err);
			}
			console.log("hello");
			res.json(stores);
			//res.render("stores",{"stores":stores});
		})
	})
	.post(function(req,res){
		var store = new Store();
		console.log('-----------------------------');
		console.log(req.body.address);
		var recData = req.body;
		store.name = recData.name;
		var city_name = recData.address.city;
		store.address = recData.address;
		store.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success:false,'message':'User already exists'});
				}
				else{
					return res.send(err)
				}
			}
			saveSearchList(req.body.name,"store",city_name,req,res);
			res.json({message:"Store created"});
		});
	});
storeRouter.route('/stores/:store_id')
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
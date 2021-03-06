(function(angular){
'use strict';
angular.module('app.common')
	.service('citiesService', ["$http",citiesService])
	.service('getCategoryService',[function(){}])
	.service('searchService', ["$http",searchService])
	.service('httpService', ["$http",httpService])
	.service('sortService',[sortService])
	.service('changeBrowserURL', ["$location",changeBrowserURL])
	.service('arrayObjectMapper',[arrayObjectMapper])
	.service('arrayUniqueCopy',[arrayUniqueCopy])
	.service('userLocationService',[userLocationService]);
	function citiesService($http){
   		this.getCities = function() {
   			var gc = this;
   			gc.cityData  = undefined;
      		gc.cityData = $http.get("http://localhost:3000/store/cities");
			return  gc.cityData;
		};
	}
	function searchService($http){
   		this.getSearches = function(userLocation) {
   			console.log("inside http");
   			console.log(userLocation);
   			var gs = this;
   			gs.searchesData  = undefined;
   			var url = "http://localhost:3000/search/searches/"+userLocation;
      		gs.searchesData = $http.get(url);
			return  gs.searchesData;
		};
	}
	function httpService($http){
		this.getService = function(url){
			return $http.get(url);
		};
	}
	function sortService(){
		this.sortByKey = function(array, key) {
		    return array.sort(function(a, b) {
		        var x = a[key]; var y = b[key];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		    	});
		};
	}

	function changeBrowserURL($location){
		this.changeBrowserURLMethod = function(path){
			$location.path(path);
		};
	}
	function arrayObjectMapper(){
		this.getArrayFunction = function(arrayObj,item){
			var arr1 = [];
			for (var i = arrayObj.length - 1; i >= 0; i--) {
						arr1.push(arrayObj[i][item]);
			}
			return arr1;
		};
	}
	function arrayUniqueCopy(){
		this.getUniqueCopyFunction = function(sourceArray,destArray){
			angular.forEach(sourceArray, function(item){
				if(destArray.indexOf(item)==-1){
					destArray.push(item);
				}

			});
			return destArray;
		};
	}
	function userLocationService(){
		var userLocation = "";
		this.setUserLocation = setUserLocation;
		this.getUserLocation = getUserLocation;

		function setUserLocation(userLocation2){
			userLocation = userLocation2;
		}
		function getUserLocation(){
			return userLocation;
		}
	}
	function ajaxURL(){
		this.port = 3000;
		this.host = "localhost:";
		this.protocol = "https:";
		this.baseUrl = this.protocol+"//"+this.host+this.port+"/";

		this.getStoresWithCatgeoryLocation = this.baseUrl + "store/storesCollection/category/";//:category/:location?";
		this.getStoresWithNameLocation = this.baseUrl + "store/storesCollection/storeName/";
		this.getSingleStoreWithId = this.baseUrl + "store/singleStore/";

		this.getProductsWithCatgeoryLocation = this.baseUrl + "product/productsCollection/category/";//:product/:location?";
		this.getProductsWithSubCatgeoryLocation = this.baseUrl + "product/productsCollection/subCategory/";//:product/:location?";
		this.getProductsWithNameLocation = this.baseUrl + "product/productsCollection/productName/";
		this.getProductsWithStoreId = this.baseUrl + "product/productsCollection/store/";
		this.getSingleProductWithId = this.baseUrl + "product/singleProduct/";

		this.getCategoriesWithLocation = this.baseUrl + "categories/location";

	}
})(window.angular);

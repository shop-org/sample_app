angular.module('app.common')
	.service('citiesService', ["$http",citiesService])
	.service('searchService', ["$http",searchService]);
	function citiesService($http){
   		this.getCities = function() {
   			var gc = this;
   			gc.cityData  = undefined;
      		gc.cityData = $http.get("http://localhost:3000/store/cities");
			return  gc.cityData;
   		}
	};
	function searchService($http){
   		this.getSearches = function(userLocation) {
   			var gs = this;
   			gs.searchesData  = undefined;
   			var url = "http://localhost:3000/search/searches/"+userLocation;
      		gs.searchesData = $http.get(url);
			return  gs.searchesData;
   		}
	};
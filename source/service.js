angular.module("ngAudioSprite.service", []).factory("audioSprite", ["$http", function($http) {

    return {

        id: "",

        play: function(id) {
            this.id = id;
        },

        getSprite: function(file) {
            return $http.get(file);
        }
    };

}]);
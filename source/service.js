angular.module("ngAudioSprite.service", []).factory("audioSprite", ["$http", function($http) {

    function getPath(url) {
        var parts = url.split("/");
        parts.splice(parts.length - 1, 1);
        return parts.join("/") + "/";
    }

    return {

        id: "",
        config: {},

        play: function(id) {
            this.id = id;
        },

        load: function(file) {

            var self = this;

            $http.get(file).success(function(data) {
                self.config = data;
                self.config.path = getPath(file);
            }).error(function() {
                throw "Failed to retrieve audio sprite configuration file: " + file;
            })
        }
    };

}]);
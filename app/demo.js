angular.module("demo", ["ngAudioSprite"]).controller("main", ["$scope", "audioSprite", function($scope, audioSprite) {

    $scope.play = function() {

        audioSprite.play("round1");

    };

}]);
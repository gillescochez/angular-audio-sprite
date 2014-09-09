angular.module("demo", ["ngAudioSprite"]).controller("main", ["$scope", "audioSprite", function($scope, audioSprite) {

    $scope.list = ["round1", "round2", "round3", "round4", "round5", "round6", "round7", "round-final"];

    $scope.play = function(id) {

        audioSprite.play(id);

    };

}]);
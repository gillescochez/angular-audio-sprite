angular.module("demo", ["ngAudioSprite"]).controller("main", ["$scope", "audioSprite", function($scope, audioSprite) {

    $scope.list = ["round1", "round2", "round3", "round4", "round5", "round6", "round-final"];

    $scope.volumeValue = 80;
    $scope.volume = function() {
        audioSprite.volume($scope.volumeValue / 100);
    };

    $scope.mute = function() {
        if (audioSprite.muted) {
            audioSprite.unmute();
        } else {
            audioSprite.mute();
        }
    };

    $scope.pause = function() {
        audioSprite.pause();
    };

    $scope.play = function(id) {
        audioSprite.play(id);
    };

    $scope.stop = function() {
        audioSprite.stop();
    };

}]);
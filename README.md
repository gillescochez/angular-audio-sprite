ngAudioSprite
===================

Audio sprite player for angular consisting of a service and a directive. The service is used to load and control sounds on the sprite and the directive is used to control the audio tag.

The angular audio sprite has been designed around the format output used by the [audiosprite](https://github.com/tonistiigi/audiosprite) which generates audio sprites in multiple formats 
as well as a JSON map of the sounds.

## Usage

### HTML

```
<body ng-app="demo" ng-controller="main">

    <audio ng-audio-sprite></audio>

    <button ng-repeat="id in list" ng-click="play(id)">{{id}}</button>
    <button ng-click="stop()">Stop</button>

</body>
```

### JS

```

angular.module("demo", ["ngAudioSprite"]).controller("main", ["$scope", "audioSprite", function($scope, audioSprite) {

    audioSprite.load("audio/sprite.json");

    $scope.list = ["round1", "round2", "round3", "round4", "round5", "round6", "round-final"];

    $scope.play = function(id) {
        audioSprite.play(id);
    };

    $scope.stop = function(id) {
        audioSprite.stop();
    };

}]);

```

To run the demo simply clone this repo, install dependencies and run the web server. The demo will be available at `http://localhost:8000/app/`
 
```npm install``` to install dependencies

```npm start``` to start the web server

## Dev commands

```npm test``` to start unit testing suite (test run when app file is updated)

```npm run protractor``` to start end to end testing, the web server must be running and WebDriver installed using ```npm run update-webdriver```

```grunt``` to build the application from the source directory

```grunt watch``` to build the application when files are updated

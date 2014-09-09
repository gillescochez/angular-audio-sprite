describe("angular audio sprite directive", function() {

    var $httpBackend;
    var $rootScope;
    var $compile;

    beforeEach(module("ngAudioSprite.service"));
    beforeEach(module("ngAudioSprite.directive"));

    beforeEach(inject(function($injector) {

        $rootScope = $injector.get("$rootScope");
        $compile = $injector.get("$compile");

        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', 'app/audio/sprite.json').respond({
            "resources": [
                "sprite.ogg",
                "sprite.m4a",
                "sprite.mp3",
                "sprite.ac3"
            ],
            "spritemap": {
                "round1": {
                    "start": 3,
                    "end": 4.824013605442177,
                    "loop": false
                }
            }
        });

        $httpBackend.when('GET', 'app/audio/sprite2.json').respond({
            "resources": [
                "sprite2.ogg",
                "sprite2.m4a",
                "sprite2.mp3",
                "sprite2.ac3"
            ],
            "spritemap": {
                "round1": {
                    "start": 3,
                    "end": 4.824013605442177,
                    "loop": false
                }
            }
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should append a source tag with the appropriate type and src attributes values", inject(function(audioSprite) {

        var element = $compile('<audio audio-sprite></audio>')($rootScope);
        var source;

        audioSprite.load("app/audio/sprite.json");
        $httpBackend.flush();

        source = element.children()[0];

        expect(source.src.indexOf("app/audio/sprite.ogg") !== -1).toEqual(true);
        expect(source.type).toEqual("audio/ogg");

    }));

    it("should update the current source tag if any if the config is updated", inject(function(audioSprite) {

        var element = $compile('<audio audio-sprite></audio>')($rootScope);
        var source;

        audioSprite.load("app/audio/sprite.json");
        $httpBackend.flush();

        source = element.children()[0];

        expect(source.src.indexOf("app/audio/sprite.ogg") !== -1).toEqual(true);
        expect(source.type).toEqual("audio/ogg");

        audioSprite.load("app/audio/sprite2.json");
        $httpBackend.flush();

        expect(element.children()[1]).toEqual(undefined);
        expect(source.src.indexOf("app/audio/sprite2.ogg") !== -1).toEqual(true);
        expect(source.type).toEqual("audio/ogg");

    }));

});
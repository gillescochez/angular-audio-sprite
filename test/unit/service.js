describe("angular audio sprite service", function() {

    beforeEach(module("ngAudioSprite.service"));

    it("should expose an id STRING property", inject(function(audioSprite) {
        expect(audioSprite.id).toBeDefined();
        expect(typeof audioSprite.id).toEqual("string");
    }));

    it("should expose a play method", inject(function(audioSprite) {
        expect(audioSprite.play).toBeDefined();
        expect(typeof audioSprite.play).toEqual("function");
    }));

    it("should expose a getSprite method", inject(function(audioSprite) {
        expect(audioSprite.getSprite).toBeDefined();
        expect(typeof audioSprite.getSprite).toEqual("function");
    }));

});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
class Song {
    //TODO: use a Map<string, string>
    // goal_requirements: string = "";
    // goal_conf_management: string = "";
    setValues(songid, name, artName, albId, sLength) {
        this.id = songid;
        this.songName = name;
        this.artistName = artName;
        this.albumId = albId;
        this.length = sLength;
    }
    constructor() {
        this.id = 0;
        this.songName = "";
        this.artistName = "";
        this.albumId = 0;
        this.length = 0;
        this.clean();
    }
    clean() {
        this.id = 0;
        this.songName = "";
        this.artistName = "";
        this.albumId = 0;
        this.length = 0;
    }
    clone() {
        var song = new Song();
        song.copyFrom(this);
        return song;
    }
    copyFrom(from) {
        this.id = from.id;
        this.songName = from.songName;
        this.artistName = from.artistName;
        //TODO: refactor! easy to forget one case; this should be a loop.
        this.albumId = from.albumId;
        this.length = from.length;
    }
}
exports.Song = Song;
//# sourceMappingURL=song.js.map
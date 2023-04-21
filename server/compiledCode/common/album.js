"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
class Album {
    // Constructor for a album object
    constructor() {
        // Initialize all parameters to a default value.
        // 0 is used for numbers and empty string for strings
        this.id = 0;
        this.albumName = "";
        this.artistName = "";
        // Song array that will hold the songs in an album
        this.songs = [];
        this.clean();
    }
    // Cleaning the state of the album
    clean() {
        this.id = 0;
        this.albumName = "";
        this.artistName = "";
        // this.goal_requirements = "";
        // this.goal_conf_management = "";
        this.songs = [];
    }
    // Cloning the album object
    clone() {
        var album = new Album();
        album.copyFrom(this);
        return album;
    }
    // Copying another album object into the current one
    copyFrom(from) {
        this.id = from.id;
        this.albumName = from.albumName;
        this.artistName = from.artistName;
        // TODO: refactor! easy to forget one case; this should be a loop.
        // this.goal_requirements = from.goal_requirements;
        // this.goal_conf_management = from.goal_conf_management;
        this.songs = from.songs;
    }
    // Getting all the songs in the object
    getSongs() {
        return this.songs;
    }
}
exports.Album = Album;
//# sourceMappingURL=album.js.map
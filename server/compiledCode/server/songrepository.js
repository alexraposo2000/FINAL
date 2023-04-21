"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongRepository = void 0;
const song_1 = require("../common/song");
class SongRepository {
    constructor() {
        this.songs = [];
    }
    // Create a song object
    add(song) {
        var result = new song_1.Song();
        if (this.idAvailable(song.id) && this.nameAvailable(song.songName)) {
            // result = new Song();
            result.copyFrom(song);
            this.songs.push(result);
            return result;
        }
        return null;
    }
    idAvailable(id) {
        return !this.songs.find(a => a.id == id);
    }
    nameAvailable(songName) {
        return !this.songs.find(a => a.songName == songName);
    }
    // Find a song object within our song repo given the song id
    // Used to help add and remove songs from a playlist
    findSongById(id) {
        for (var song of this.songs) {
            if (song.id == id) {
                return song;
            }
        }
        var result = new song_1.Song();
        return result;
    }
    // Search for a song by name
    searchSong(name) {
        var result = this.songs.find(a => a.songName == name);
        // no song found
        if (typeof result === 'undefined') {
            result = new song_1.Song();
            // song found
        }
        else {
        }
        return result;
    }
    getSongs() {
        return this.songs;
    }
}
exports.SongRepository = SongRepository;
//# sourceMappingURL=songrepository.js.map
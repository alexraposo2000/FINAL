"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
class Playlist {
    constructor() {
        this.id = 0;
        this.creatorId = 0;
        this.playlistName = "";
        this.songs = [];
        this.clean();
    }
    setName(name) {
        this.playlistName = name;
    }
    clean() {
        this.creatorId = 0;
        this.id = 0;
        this.playlistName = "";
        while (this.songs.length > 0) {
            this.songs.pop();
        }
    }
    clone() {
        var playlist = new Playlist();
        playlist.copyFrom(this);
        return playlist;
    }
    copyFrom(from) {
        this.id = from.id;
        this.creatorId = from.creatorId;
        this.playlistName = from.playlistName;
        for (let i = 0; i < from.songs.length; i++) {
            this.songs.push(from.songs[i]);
        }
    }
    getSongs() {
        return this.songs;
    }
    // Add song to playlist: only add song if it has not already been added
    addSong(song) {
        var found = false;
        for (var s of this.songs) {
            if (s.id == song.id) {
                console.log("SONG ID WAS FOUND");
                found = true;
            }
        }
        if (!found) {
            this.songs.push(song);
            return song;
        }
        return null; // song already exists in the playlist
    }
    // Remove a song from a playlist (only remove if the song is actually contained in the playlist)
    removeSong(song) {
        for (let i = 0; i < this.songs.length; i++) {
            if (song.id == this.songs[i].id) {
                this.songs.splice(i, 1);
                return song; // song was found in playlist, return the removed song (success)
            }
        }
        return null; // song did not exist in playlist (fail)
    }
}
exports.Playlist = Playlist;
//# sourceMappingURL=playlist.js.map
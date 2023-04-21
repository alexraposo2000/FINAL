"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistRepository = void 0;
const playlist_1 = require("../common/playlist");
class PlaylistRepository {
    constructor() {
        this.playlists = [];
        this.nextId = 0;
    }
    add(playlist) {
        var result = new playlist_1.Playlist();
        if (this.nameAvailable(playlist.playlistName)) {
            if (this.nextId > Number.MAX_SAFE_INTEGER) {
                result;
            }
            playlist.id = this.nextId;
            this.nextId = this.nextId + 1;
            result.copyFrom(playlist);
            this.playlists.push(result);
            return result;
        }
        return null;
    }
    remove(playlist) {
        for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].id == playlist.id) {
                var result = this.playlists[i];
                this.playlists.splice(i, 1);
                return result;
            }
        }
        return new playlist_1.Playlist();
    }
    idAvailable(id) {
        return !this.playlists.find(a => a.id == id);
    }
    nameAvailable(playlistName) {
        return !this.playlists.find(a => a.playlistName == playlistName);
    }
    // Find a playlist object within our playlist repo given the playlist id
    // Used to find the desired playlist when adding or removing a song from it
    findPlaylistById(id) {
        for (var playlist of this.playlists) {
            if (playlist.id == id) {
                return playlist;
            }
        }
        return new playlist_1.Playlist();
    }
    // // SEARCH PLAYLIST BY NAME
    // searchPlaylist(name: string): Playlist {
    //   var result = this.playlists.find(a => a.playlistName == name);
    //   // if (result) result.copyFrom(song);
    //   if (typeof result === 'undefined'){
    //     result = new Playlist();
    //   }
    //   return result;
    // }
    // SEARCH PLAYLIST BY NAME
    searchPlaylist(name) {
        for (var playlist of this.playlists) {
            if (playlist.playlistName == name) {
                console.log("PLAYLIST" + name + playlist.playlistName);
                return playlist;
            }
        }
        var result = new playlist_1.Playlist();
        return result;
    }
    update(playlist) {
        var result = this.playlists.find(a => a.id == playlist.id);
        if (result)
            result.copyFrom(playlist);
        if (typeof result === 'undefined') {
            result = new playlist_1.Playlist();
        }
        return result;
    }
    getPlaylists() {
        return this.playlists;
    }
}
exports.PlaylistRepository = PlaylistRepository;
//# sourceMappingURL=playlistrepository.js.map
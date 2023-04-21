"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumRepository = void 0;
const album_1 = require("../common/album");
class AlbumRepository {
    constructor() {
        this.albums = [];
    }
    add(album) {
        var result = new album_1.Album();
        if (this.idAvailable(album.id) && this.nameAvailable(album.albumName)) {
            result = new album_1.Album();
            result.copyFrom(album);
            this.albums.push(result);
        }
        return result;
    }
    remove(album) {
        for (let i = 0; i < this.albums.length; i++) {
            if (this.albums[i].id == album.id) {
                var result = this.albums[i];
                this.albums.splice(i, 1);
                return result;
            }
        }
        return new album_1.Album();
    }
    idAvailable(id) {
        return !this.albums.find(a => a.id == id);
    }
    nameAvailable(albumName) {
        return !this.albums.find(a => a.albumName == albumName);
    }
    // Find a playlist object within our playlist repo given the playlist id
    // Used to find the desired playlist when adding or removing a song from it
    findAlbumById(id) {
        for (var album of this.albums) {
            if (album.id == id) {
                return album;
            }
        }
        return new album_1.Album();
    }
    // SEARCH ALBUM BY NAME
    searchAlbum(name) {
        var result = this.albums.find(a => a.albumName == name);
        if (typeof result === 'undefined') {
            result = new album_1.Album();
        }
        return result;
    }
    update(album) {
        var result = this.albums.find(a => a.id == album.id);
        if (result) {
            result.copyFrom(album);
        }
        else {
            result = new album_1.Album();
        }
        return result;
    }
    getAlbums() {
        return this.albums;
    }
}
exports.AlbumRepository = AlbumRepository;
//# sourceMappingURL=albumrepository.js.map
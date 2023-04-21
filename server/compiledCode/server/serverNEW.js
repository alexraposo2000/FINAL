"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.server = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const playlistrepository_1 = require("./playlistrepository");
const song_album_creator_1 = require("../common/song-album-creator");
var taserver = express();
var playlistrepo = new playlistrepository_1.PlaylistRepository();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
taserver.use(allowCrossDomain);
taserver.use(bodyParser.json());
// Return all songs
taserver.get('/songs', function (req, res) {
    res.send(JSON.stringify(song_album_creator_1.songRepository.getSongs()));
});
// Create a new song
taserver.post('/song/create', function (req, res) {
    var song = req.body;
    song = song_album_creator_1.songRepository.add(song);
    if (song) {
        res.send({ "success": "Song successfully added." });
    }
    else {
        res.send({ "failure": "Song could not be added." });
    }
});
// Return all playlists
taserver.get('/library', function (req, res) {
    console.log('Requesting playlist information from /library resource');
    res.send(JSON.stringify(playlistrepo.getPlaylists()));
});
// Create a new playlist
taserver.post('/library', function (req, res) {
    var playlist = req.body;
    playlist = playlistrepo.add(playlist);
    if (playlist) {
        console.log('Successfully created playlist at /library resource');
        res.send(JSON.stringify(playlist));
    }
    else {
        console.log('Failed /library resource request: Playlist with this name or id already exists or maximum number of playlists reached.');
        res.send({ "failure": "Playlist with this name or id already exists." });
    }
});
// Delete playlist
taserver.delete('/library/delete/:id', function (req, res) {
    var playlist = playlistrepo.findPlaylistById(Number(req.params.id));
    if (playlist) {
        var deleted = playlistrepo.remove(playlist);
        if (deleted) {
            console.log('Successfully deleted playlist at /library resource');
            res.send({ "success": "Playlist successfully deleted." });
        }
        else {
            console.log('Failed /library delete resource request: Tried to remove non-existent playlist');
            res.send({ "failure": "Playlist could not be deleted." });
        }
    }
    else {
        console.log('Failed /library delete resource request: Playlist does not exist');
        res.send({ "failure": "Playlist could not be deleted." });
    }
});
// Return all songs of a given playlist
taserver.get('/library/playlist-:id/songs', function (req, res) {
    var playlist = playlistrepo.findPlaylistById(Number(req.params.id));
    if (playlist) {
        console.log('Successfully retrieved songs at /library/playlist-name/songs resource');
        res.send(JSON.stringify(playlist.getSongs()));
    }
    else {
        console.log('Failed /library/playlist-name/songs resource request: Tried to access non-existent playlist');
        res.send({ "failure": "No such playlist with this name" });
    }
});
// Remove song from playlist
taserver.put('/library/remove-song-:sid/from-playlist-:plid', function (req, res) {
    var songId = Number(req.params.sid);
    var playlistId = Number(req.params.plid);
    var playlist = playlistrepo.findPlaylistById(playlistId);
    var song = song_album_creator_1.songRepository.findSongById(songId);
    if (playlist && song) {
        var removed = playlist.removeSong(song);
        if (removed) {
            console.log('Successfully removed song at /library/remove-song-songId/from-playlist-playlistId resource');
            res.send(JSON.stringify(playlist.getSongs()));
        }
        else {
            console.log('Failed /library/remove-song-songId/from-playlist-playlistId resource request: Song is not a member of this playlist');
            res.send({ "failure": "Song is not contained in this playlist." });
        }
    }
    else {
        console.log('Failed /library/remove-song-songId/from-playlist-playlistId resource request: Song or playlist does not exist');
        res.send({ "failure": "Playlist data could not be updated." });
    }
});
// Add song to playlist
taserver.put('/search/add-song-:sid/to-playlist-:plName', function (req, res) {
    var songId = Number(req.params.sid);
    var playlistName = req.params.plName;
    var playlist = playlistrepo.searchPlaylist(playlistName);
    var song = song_album_creator_1.songRepository.findSongById(songId);
    console.log("HERE: " + req.params.plName);
    if (playlist && song) {
        console.log("HERE SONG: " + song);
        var ret = playlist.addSong(song);
        console.log("HERE RET: " + ret);
        if (ret) {
            console.log('Successfully added song at /library/add-song-songId/to-playlist-playlistId resource');
            res.send(JSON.stringify(playlist.getSongs()));
        }
        else {
            console.log('Failed /library/add-song-songId/to-playlist-playlistId resource request: Song already exists within this playlist');
            res.send({ "failure": "Song is already contained within the playlist. Duplicates are prohibited" });
        }
    }
    else {
        console.log('Failed /library/add-song-songId/to-playlist-playlistId resource request: Song or playlist does not exist');
        res.send({ "failure": "Could not add song to playlist." });
    }
});
// Search for a playlist with matching name
taserver.get('/search/match-playlist-:pName', function (req, res) {
    var playlistName = req.params.pName;
    var playlist = playlistrepo.searchPlaylist(playlistName);
    console.log('Requested information from resource /search/match-playlist-name');
    res.send(JSON.stringify(playlist));
});
// Return a playlist given its id
taserver.get('/library/:id', function (req, res) {
    var playlist = playlistrepo.findPlaylistById(Number(req.params.id));
    if (playlist) {
        res.send(JSON.stringify(playlist));
    }
    else {
        res.send({ "failure": "No such playlist with this ID." });
    }
});
var server = taserver.listen(3000, function () {
    console.log('Server listening on port 3000!');
});
exports.server = server;
function closeServer() {
    server.close();
}
exports.closeServer = closeServer;
//# sourceMappingURL=serverNEW.js.map
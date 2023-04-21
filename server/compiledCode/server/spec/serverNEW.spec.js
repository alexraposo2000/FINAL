"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
var base_url = "http://localhost:3000/";
describe("O server", () => {
    var server;
    beforeAll(() => { server = require('../serverNEW'); });
    afterAll(() => { server.closeServer(); });
    // Make sure the playlist repository is initially empty
    it("initially returns an empty list of playlists", () => {
        return request.get(base_url + "library")
            .then(body => expect(body).toBe("[]"))
            .catch(e => expect(e).toEqual(null));
    });
    // Create a playlist and make sure it gets added to the repository
    it("only add playlists", () => {
        var options = { method: 'POST', uri: (base_url + "library"), body: { creatorId: 1, playlistName: "Dance Music", songs: [] }, json: true };
        return request(options)
            .then(body => 
        //  expect(body).toEqual({success: "Playlist successfully created."})
        expect(body).toEqual({ id: 0, creatorId: 1, playlistName: "Dance Music", songs: [] })).catch(e => expect(e).toEqual(null));
    });
    // Delete the playlist we just added to the repo
    // Don't need to test negative case because you need to view a playlist to delete it, which the app cannot allow
    it("only delete playlist", () => {
        var options = { method: 'DELETE', uri: (base_url + "library/delete/:Dance Music"), body: { id: 1, creatorId: 1, playlistName: "Dance Music", songs: [] }, json: true };
        return request(options)
            .then(body => expect(body).toEqual({ success: "Playlist successfully deleted." })).catch(e => expect(e).toEqual(null));
    });
    // Make sure the song repo only contains the initial static songs (before we add any new songs)
    var base_songs = '[{"id":1,"songName":"Welcome to New York","artistName":"Taylor Swift","albumId":1,"length":212},{"id":2,"songName":"Blank Space","artistName":"Taylor Swift","albumId":1,"length":231},{"id":3,"songName":"Style","artistName":"Taylor Swift","albumId":1,"length":231},{"id":4,"songName":"Out of The Woods","artistName":"Taylor Swift","albumId":1,"length":235},{"id":5,"songName":"All You Had To Do Was Stay","artistName":"Taylor Swift","albumId":1,"length":193},{"id":6,"songName":"Shake It Off","artistName":"Taylor Swift","albumId":1,"length":219},{"id":7,"songName":"I Wish You Would","artistName":"Taylor Swift","albumId":1,"length":207},{"id":8,"songName":"Bad Blood","artistName":"Taylor Swift","albumId":1,"length":211},{"id":9,"songName":"Wildest Dreams","artistName":"Taylor Swift","albumId":1,"length":220},{"id":10,"songName":"How You Get The Girl","artistName":"Taylor Swift","albumId":1,"length":247},{"id":11,"songName":"This Love","artistName":"Taylor Swift","albumId":1,"length":250},{"id":12,"songName":"I Know Places","artistName":"Taylor Swift","albumId":1,"length":195},{"id":13,"songName":"Clean","artistName":"Taylor Swift","albumId":1,"length":271},{"id":14,"songName":"Song 14","artistName":"Artist 2","albumId":2,"length":60},{"id":15,"songName":"Song 15","artistName":"Artist 2","albumId":2,"length":60},{"id":16,"songName":"Song 16","artistName":"Artist 2","albumId":2,"length":60},{"id":17,"songName":"Song 17","artistName":"Artist 2","albumId":2,"length":60},{"id":18,"songName":"Song 18","artistName":"Artist 2","albumId":2,"length":60},{"id":19,"songName":"Dynamite","artistName":"BTS","albumId":3,"length":199},{"id":20,"songName":"How You Like That","artistName":"BLACKPINK","albumId":4,"length":181}]';
    it("initially returns initial/static list of songs", () => {
        return request.get(base_url + "songs")
            .then(body => expect(body).toBe(base_songs))
            .catch(e => expect(e).toEqual(null));
    });
    // Add a song to the repo
    it("only add songs", () => {
        var options = { method: 'POST', uri: (base_url + "song/create"), body: { id: 21, songName: "Yellow Submarine", artistName: "Beatles", albumId: 1, length: 120 }, json: true };
        return request(options)
            .then(body => expect(body).toEqual({ success: "Song successfully added." })).catch(e => expect(e).toEqual(null));
    });
    // Don't add songs to the repo with duplicate it (because it will break searching for songs using ID)
    it("do not add songs with duplicate id", () => {
        var song1 = { "json": { "id": 22, "songName": "Red", "artistName": "Roses", "albumId": 0, "length": 120 } };
        var song2 = { "json": { "id": 22, "songName": "Yellow", "artistName": "Rhianna", "albumId": 3, "length": 130 } };
        var response1 = '[{"id":1,"songName":"Welcome to New York","artistName":"Taylor Swift","albumId":1,"length":212},{"id":2,"songName":"Blank Space","artistName":"Taylor Swift","albumId":1,"length":231},{"id":3,"songName":"Style","artistName":"Taylor Swift","albumId":1,"length":231},{"id":4,"songName":"Out of The Woods","artistName":"Taylor Swift","albumId":1,"length":235},{"id":5,"songName":"All You Had To Do Was Stay","artistName":"Taylor Swift","albumId":1,"length":193},{"id":6,"songName":"Shake It Off","artistName":"Taylor Swift","albumId":1,"length":219},{"id":7,"songName":"I Wish You Would","artistName":"Taylor Swift","albumId":1,"length":207},{"id":8,"songName":"Bad Blood","artistName":"Taylor Swift","albumId":1,"length":211},{"id":9,"songName":"Wildest Dreams","artistName":"Taylor Swift","albumId":1,"length":220},{"id":10,"songName":"How You Get The Girl","artistName":"Taylor Swift","albumId":1,"length":247},{"id":11,"songName":"This Love","artistName":"Taylor Swift","albumId":1,"length":250},{"id":12,"songName":"I Know Places","artistName":"Taylor Swift","albumId":1,"length":195},{"id":13,"songName":"Clean","artistName":"Taylor Swift","albumId":1,"length":271},{"id":14,"songName":"Song 14","artistName":"Artist 2","albumId":2,"length":60},{"id":15,"songName":"Song 15","artistName":"Artist 2","albumId":2,"length":60},{"id":16,"songName":"Song 16","artistName":"Artist 2","albumId":2,"length":60},{"id":17,"songName":"Song 17","artistName":"Artist 2","albumId":2,"length":60},{"id":18,"songName":"Song 18","artistName":"Artist 2","albumId":2,"length":60},{"id":19,"songName":"Dynamite","artistName":"BTS","albumId":3,"length":199},{"id":20,"songName":"How You Like That","artistName":"BLACKPINK","albumId":4,"length":181},{"id":21,"songName":"Yellow Submarine","artistName":"Beatles","albumId":1,"length":120},{"id":22,"songName":"Red","artistName":"Roses","albumId":0,"length":120}]';
        var response2 = '{"id":22, "songName": "Yellow", "artistName": "Rhianna", "albumId": 3, "length": 130}';
        return request.post(base_url + "song/create", song1)
            .then(body => {
            expect(body).toEqual({ success: "Song successfully added." });
            return request.post(base_url + "song/create", song2)
                .then(body => {
                expect(body).toEqual({ failure: "Song could not be added." });
                return request.get(base_url + "songs")
                    .then(body => {
                    expect(body).toContain(response1);
                    expect(body).not.toContain(response2);
                });
            });
        })
            .catch(err => {
            expect(err).toEqual(null);
        });
    });
    // Don't add songs with duplicate names (because it will break searching for song by name - want a unique search result)
    it("do not add songs with duplicate name", () => {
        var song1 = { "json": { "id": 23, "songName": "Cake By The Ocean", "artistName": "DNCE", "albumId": 1, "length": 120 } };
        var song2 = { "json": { "id": 24, "songName": "Cake By The Ocean", "artistName": "Rhianna", "albumId": 2, "length": 130 } };
        var response1 = '[{"id":1,"songName":"Welcome to New York","artistName":"Taylor Swift","albumId":1,"length":212},{"id":2,"songName":"Blank Space","artistName":"Taylor Swift","albumId":1,"length":231},{"id":3,"songName":"Style","artistName":"Taylor Swift","albumId":1,"length":231},{"id":4,"songName":"Out of The Woods","artistName":"Taylor Swift","albumId":1,"length":235},{"id":5,"songName":"All You Had To Do Was Stay","artistName":"Taylor Swift","albumId":1,"length":193},{"id":6,"songName":"Shake It Off","artistName":"Taylor Swift","albumId":1,"length":219},{"id":7,"songName":"I Wish You Would","artistName":"Taylor Swift","albumId":1,"length":207},{"id":8,"songName":"Bad Blood","artistName":"Taylor Swift","albumId":1,"length":211},{"id":9,"songName":"Wildest Dreams","artistName":"Taylor Swift","albumId":1,"length":220},{"id":10,"songName":"How You Get The Girl","artistName":"Taylor Swift","albumId":1,"length":247},{"id":11,"songName":"This Love","artistName":"Taylor Swift","albumId":1,"length":250},{"id":12,"songName":"I Know Places","artistName":"Taylor Swift","albumId":1,"length":195},{"id":13,"songName":"Clean","artistName":"Taylor Swift","albumId":1,"length":271},{"id":14,"songName":"Song 14","artistName":"Artist 2","albumId":2,"length":60},{"id":15,"songName":"Song 15","artistName":"Artist 2","albumId":2,"length":60},{"id":16,"songName":"Song 16","artistName":"Artist 2","albumId":2,"length":60},{"id":17,"songName":"Song 17","artistName":"Artist 2","albumId":2,"length":60},{"id":18,"songName":"Song 18","artistName":"Artist 2","albumId":2,"length":60},{"id":19,"songName":"Dynamite","artistName":"BTS","albumId":3,"length":199},{"id":20,"songName":"How You Like That","artistName":"BLACKPINK","albumId":4,"length":181},{"id":21,"songName":"Yellow Submarine","artistName":"Beatles","albumId":1,"length":120},{"id":22,"songName":"Red","artistName":"Roses","albumId":0,"length":120},{"id":23,"songName":"Cake By The Ocean","artistName":"DNCE","albumId":1,"length":120}]';
        var response2 = '{"id":24, "songName": "Cake By The Ocean", "artistName": "Rhianna", "albumId": 2, "length": 130}';
        return request.post(base_url + "song/create", song1)
            .then(body => {
            expect(body).toEqual({ success: "Song successfully added." });
            return request.post(base_url + "song/create", song2)
                .then(body => {
                expect(body).toEqual({ failure: "Song could not be added." });
                return request.get(base_url + "songs")
                    .then(body => {
                    expect(body).toContain(response1);
                    expect(body).not.toContain(response2);
                });
            });
        })
            .catch(err => {
            expect(err).toEqual(null);
        });
    });
    // Check that the repo is empty after earlier playlist deletion
    it("initially returns an empty list of playlists", () => {
        return request.get(base_url + "library")
            .then(body => expect(body).toBe("[]"))
            .catch(e => expect(e).toEqual(null));
    });
    // Add a playlist to support later tests
    it("only add playlists", () => {
        var options = { method: 'POST', uri: (base_url + "library"), body: { creatorId: 1, playlistName: "Fun Tunes", songs: [] }, json: true };
        return request(options)
            .then(body => expect(body).toEqual({ id: 1, creatorId: 1, playlistName: "Fun Tunes", songs: [] })).catch(e => expect(e).toEqual(null));
    });
    // Don't add playlists with duplicate names because it will interfere with home library and search for playlists
    it("do not add playlists with duplicate names", () => {
        var opt1 = { method: 'POST', uri: (base_url + "library"), body: { creatorId: 1, playlistName: "Jazz", songs: [] }, json: true };
        var opt2 = { method: 'POST', uri: (base_url + "library"), body: { creatorId: 2, playlistName: "Jazz", songs: [] }, json: true };
        //   var playlist1 = {json:{"creatorId": 1, "playlistName": "Jazz","songs":[Song]}};
        //   var playlist2 = {json:{"creatorId": 2, "playlistName": "Jazz","songs":[Song]}};
        var response1 = '[{"id":1,"creatorId":1,"playlistName":"Fun Tunes","songs":[]},{"id":2,"creatorId":1,"playlistName":"Jazz","songs":[]}]';
        var response2 = '{"id":2, "creatorId": 2, "playlistName": "Jazz","songs":[]}';
        return request(opt1)
            .then(body => {
            expect(body).toEqual({ id: 2, creatorId: 1, playlistName: 'Jazz', songs: [] });
            return request(opt2)
                .then(body => {
                expect(body).toEqual({ failure: "Playlist with this name or id already exists." });
                return request.get(base_url + "library")
                    .then(body => {
                    expect(body).toContain(response1);
                    expect(body).not.toContain(response2);
                });
            });
        })
            .catch(err => {
            expect(err).toEqual(null);
        });
    });
    // Search for a playlist that doesn't exist (should expect empty playlist as response)
    it("search for a playlist that doesn't exist", () => {
        var response1 = '{"id":0,"creatorId":0,"playlistName":"","songs":[]}';
        return request.get(base_url + "search/match-playlist-Hippy")
            .then(body => expect(body).toBe(response1))
            .catch(e => expect(e).toEqual(null));
    });
    // Search for a playlist
    it("search for a playlist", () => {
        var playlist = { method: 'POST', uri: (base_url + "library"), body: { creatorId: 0, playlistName: "Hippy", songs: [] }, json: true };
        request(playlist);
        var response1 = '{"id":3,"creatorId":0,"playlistName":"Hippy","songs":[]}';
        return request.get(base_url + "search/match-playlist-Hippy")
            .then(body => expect(body).toBe(response1))
            .catch(e => expect(e).toEqual(null));
    });
    // INTEGRATION TEST: Searching for songs and adding to playlist
    it("search for a song and add it to a playlist", () => {
        var options = { method: 'PUT', uri: (base_url + 'search/add-song-1/to-playlist-Fun Tunes'), body: {}, json: true };
        return request(options)
            .then(body => expect(body).toEqual([{ id: 1, songName: 'Welcome to New York', artistName: 'Taylor Swift', albumId: 1, length: 212 }])).catch(e => expect(e).toEqual(null));
    });
    // INTEGRATION TEST: remove a song from a playlist
    it("remove a song from a playlist", () => {
        var options = { method: 'PUT', uri: (base_url + `library/remove-song-1/from-playlist-1`), body: {}, json: true };
        return request(options)
            .then(body => expect(body).toEqual([])).catch(e => expect(e).toEqual(null));
    });
});
//# sourceMappingURL=serverNEW.spec.js.map
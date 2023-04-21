"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playlistrepository_1 = require("../playlistrepository");
const playlist_1 = require("../../common/playlist");
// Function to add a playlist to the repository
describe("O playlists in the repository", () => {
    var repository;
    function addPlaylist(id, creatorId, playlistName, songs) {
        var playlist = new playlist_1.Playlist();
        playlist.id = id;
        playlist.creatorId = creatorId;
        playlist.playlistName = playlistName;
        playlist.songs = songs;
        // student.name = name;
        // student.id = id;
        repository.add(playlist);
    }
    // Clears the state of the repository before each test
    beforeEach(() => repository = new playlistrepository_1.PlaylistRepository());
    // Tests ensures that the repository is initially empty
    it("is initially empty", () => {
        expect(repository.getPlaylists().length).toBe(0);
    });
    // Test adds a playlist to the repository, with 0 songs initially
    it("playlist was added correctly", () => {
        addPlaylist(0, 1, "Cool Songs", []);
        expect(repository.getPlaylists().length).toBe(1);
        var playlist = repository.getPlaylists()[0];
        expect(playlist.id).toBe(0);
        expect(playlist.creatorId).toBe(1);
        expect(playlist.playlistName).toBe("Cool Songs");
        expect(playlist.getSongs().length).toBe(0);
    });
    // Test ensures that consecutive playlists can be added without failures
    it("consecutive playlists added correctly", () => {
        addPlaylist(0, 1, "Cool Songs", []);
        expect(repository.getPlaylists().length).toBe(1);
        var playlist = repository.getPlaylists()[0];
        expect(playlist.id).toBe(0);
        expect(playlist.creatorId).toBe(1);
        expect(playlist.playlistName).toBe("Cool Songs");
        expect(playlist.getSongs().length).toBe(0);
        addPlaylist(1, 1, "Fun Songs", []);
        expect(repository.getPlaylists().length).toBe(2);
        var playlist2 = repository.getPlaylists()[1];
        expect(playlist2.id).toBe(1);
        expect(playlist2.creatorId).toBe(1);
        expect(playlist2.playlistName).toBe("Fun Songs");
        expect(playlist2.getSongs().length).toBe(0);
    });
    // it("does not add playlists with duplicate id", () => {
    //     addPlaylist(1, 2, "Favorites", []);
    //     addPlaylist(1, 3, "Rap Songs", []);
    //     expect(repository.getPlaylists().length).toBe(1);
    //   })
    // Test ensures that playlist with duplicate names cannot be added
    it("does not add playlists with duplicate names", () => {
        addPlaylist(1, 2, "Favorites", []);
        addPlaylist(2, 3, "Favorites", []);
        expect(repository.getPlaylists().length).toBe(1);
    });
});
//# sourceMappingURL=playlistrepository.spec.js.map
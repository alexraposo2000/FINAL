"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const songrepository_1 = require("../songrepository");
const song_1 = require("../../common/song");
describe("O songs in the repository", () => {
    var repository;
    // Function to add a new song into the repository
    function addSong(id, songName, artistName, albumId, length) {
        var song = new song_1.Song();
        song.id = id;
        song.songName = songName;
        song.artistName = artistName;
        song.albumId = albumId;
        song.length = length;
        repository.add(song);
    }
    // Clears the state of the repository before each test
    beforeEach(() => repository = new songrepository_1.SongRepository());
    it("is initially empty", () => {
        expect(repository.getSongs().length).toBe(0);
    });
    // Test to ensure a song object is properly added to the repository
    it("song was added correctly", () => {
        addSong(1, "Cake By The Ocean", "DNCE", 1, 120);
        expect(repository.getSongs().length).toBe(1);
        var song = repository.getSongs()[0];
        expect(song.id).toBe(1);
        expect(song.songName).toBe("Cake By The Ocean");
        expect(song.artistName).toBe("DNCE");
        expect(song.albumId).toBe(1);
        expect(song.length).toBe(120);
    });
    // Test ensures songs with duplicate id's are not added 
    it("does not add songs with duplicate id", () => {
        addSong(1, "Cake by The Ocean", "DNCE", 1, 120);
        addSong(1, "Dynamite", "BTS", 2, 123);
        expect(repository.getSongs().length).toBe(1);
    });
    //  Test ensures songs with duplicate names are not added 
    it("does not add songs with duplicate name", () => {
        addSong(1, "Cake by The Ocean", "DNCE", 1, 120);
        addSong(2, "Cake by The Ocean", "BTS", 2, 123);
        expect(repository.getSongs().length).toBe(1);
    });
});
//# sourceMappingURL=songrepository.spec.js.map
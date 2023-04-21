"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Unit test for song repository 
const songrepository_1 = require("../songrepository");
const song_1 = require("../../common/song");
describe("O songs in the repository", () => {
    var repository;
    function addSong(id, songName, artistName, albumId, length) {
        var song = new song_1.Song();
        song.id = id;
        song.songName = songName;
        song.artistName = artistName;
        song.albumId = albumId;
        song.length = length;
        repository.add(song);
    }
    beforeEach(() => repository = new songrepository_1.SongRepository());
    it("is initially empty", () => {
        expect(repository.getSongs().length).toBe(0);
    });
    it("song was added correctly", () => {
        addSong(1, "Cake by The Ocean", "DNCE", 1, 120);
        expect(repository.getSongs().length).toBe(1);
        var song = repository.getSongs()[0];
        expect(song.id).toBe(1);
        expect(song.songName).toBe("Cake by The Ocean");
        expect(song.artistName).toBe("DNCE");
        expect(song.albumId).toBe(1);
        expect(song.length).toBe(120);
    });
    it("does not add songs with duplicate id", () => {
        addSong(1, "Cake by The Ocean", "DNCE", 1, 120);
        addSong(1, "Dynamite", "BTS", 2, 123);
        expect(repository.getSongs().length).toBe(1);
    });
});
//# sourceMappingURL=NOT%20NEEDED%20songrepository.spec.js.map
import { AlbumRepository } from '../albumrepository';
import { Album } from '../../common/album';
import { Song } from '../../common/song';

// Function to addAlbum to to the repository
describe("O albums in the repository", () => {
    var repository: AlbumRepository;

    function addAlbum(id:number, albumName:string, artistName:string, songs:Array<Song>) {
        var album: Album = new Album();
        album.id = id;
        album.albumName = albumName;
        album.artistName = artistName;
        album.songs = songs;
        // student.name = name;
        // student.id = id;
        repository.add(album);
    }

    // Refreshing the state of the repository before each test runs
    beforeEach(() => repository = new AlbumRepository())

    // Test to ensure the repository is initially empty
    it("is initially empty", () => {
        expect(repository.getAlbums().length).toBe(0);
    })

    // Test adds a new album to the repository with no songs initially present
    it("album was added correctly", () => {
        addAlbum(1, "Favorites", "Artist 1", []);
    
        expect(repository.getAlbums().length).toBe(1);
        var album = repository.getAlbums()[0];
        expect(album.id).toBe(1);
        expect(album.albumName).toBe("Favorites");
        expect(album.artistName).toBe("Artist 1");
        expect(album.getSongs().length).toBe(0);
    })

    // Test to ensure albums with duplicate id's are not able to be added
    it("does not add albums with duplicate id", () => {
        addAlbum(1, "Favorites", "Artist 1", []);
        addAlbum(1, "Rap Songs", "Artist 2", []);
    
        expect(repository.getAlbums().length).toBe(1);
      })

})

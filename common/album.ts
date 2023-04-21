// TypeScript class called "Song" that defines the properties and methods for a song object.
// The class has five properties: "id", "songName", "artistName", "albumId", and "length", all of which have default values.
import {Song} from '../common/song';
export class Album {
    // Initialize all parameters to a default value.
    // 0 is used for numbers and empty string for strings
    id: number = 0;
    albumName: string = "";
    artistName: string = "";

    // Song array that will hold the songs in an album
    songs: Array<Song> = [];

    // Constructor for a album object
    constructor() {
        this.clean();
    }

    // Cleaning the state of the album
    clean(): void {
        this.id = 0;
        this.albumName = "";
        this.artistName = "";
        // this.goal_requirements = "";
        // this.goal_conf_management = "";
        this.songs = [];
    }

    // Cloning the album object
    clone(): Album {
        var album: Album = new Album();
        album.copyFrom(this);
        return album;
    }

    // Copying another album object into the current one
    copyFrom(from: Album): void {
        this.id = from.id;
        this.albumName = from.albumName;
        this.artistName = from.artistName;
        // TODO: refactor! easy to forget one case; this should be a loop.
        // this.goal_requirements = from.goal_requirements;
        // this.goal_conf_management = from.goal_conf_management;
        this.songs = from.songs;
    }

    // Getting all the songs in the object
    getSongs(): Song[] {
        return this.songs;
    }
     
}

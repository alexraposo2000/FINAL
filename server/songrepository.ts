import { Song } from '../common/song';

export class SongRepository {
  songs: Song[] = [];

  // Create a song object
  add(song: Song): Song | null {
    var result = new Song();
    if (this.idAvailable(song.id) && this.nameAvailable(song.songName)) {
      // result = new Song();
      result.copyFrom(song);
      this.songs.push(result);
      return result;
    }
    return null;
  }
  
  idAvailable(id: number): boolean {
    return !this.songs.find(a => a.id == id);
  }
  nameAvailable(songName: string): boolean {
    return !this.songs.find(a => a.songName == songName);
  }
  // Find a song object within our song repo given the song id
  // Used to help add and remove songs from a playlist
  findSongById(id: number): Song {
    for (var song of this.songs) {
		  if (song.id == id) {
			return song;
		}		
	}  
  var result = new Song();
	return result;	  
  }
  
  // Search for a song by name
  searchSong(name: string): Song {
    var result = this.songs.find(a => a.songName == name);
    // no song found
    if(typeof result === 'undefined'){
      result = new Song();
    // song found
    } else {
    }
    return result;
  }

  getSongs(): Song[] {
    return this.songs;
  }
}
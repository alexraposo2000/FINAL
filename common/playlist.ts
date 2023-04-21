import {Song} from '../common/song';
export class Playlist {
  id: number = 0;
  creatorId: number = 0;
  playlistName: string = "";
  songs: Song[] = [];

  constructor() {
    this.clean();
  }

  setName(name: string) {
	  this.playlistName = name;
  }
  
  clean(): void {
    this.creatorId = 0;
    this.id = 0;
    this.playlistName = "";
    while (this.songs.length > 0) {
    	this.songs.pop();
    }
  }

  clone(): Playlist {
     var playlist: Playlist = new Playlist();
     playlist.copyFrom(this);
     return playlist;
  }

  copyFrom(from: Playlist): void {
	 this.id = from.id;
     this.creatorId = from.creatorId;
     this.playlistName = from.playlistName;
     for (let i = 0; i < from.songs.length; i++) {
     	this.songs.push(from.songs[i]);
     }
  }
  
  getSongs(): Song[] {
  	return this.songs;
  }
  
  // Add song to playlist: only add song if it has not already been added
  addSong(song: Song): Song | null {
	var found: boolean = false;  
	for (var s of this.songs) {
		if (s.id == song.id) {
      console.log("SONG ID WAS FOUND")
			found = true;
		}
	}  
	if(!found) {
  		this.songs.push(song); 
  		return song;
  	}
 	return null; // song already exists in the playlist
  }
  
  // Remove a song from a playlist (only remove if the song is actually contained in the playlist)
  removeSong(song: Song): Song | null {
  	for (let i = 0; i < this.songs.length; i++) {
  		if (song.id == this.songs[i].id) {
  			this.songs.splice(i, 1);
  			return song; // song was found in playlist, return the removed song (success)
  		}
  	}
  	return null; // song did not exist in playlist (fail)
  }
}

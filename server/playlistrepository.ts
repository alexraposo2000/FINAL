import { Playlist } from '../common/playlist';

export class PlaylistRepository {
  playlists: Playlist[] = [];
  nextId: number = 0;
  
  add(playlist: Playlist): Playlist | null {
    var result = new Playlist();
    if (this.nameAvailable(playlist.playlistName)) {
	  if (this.nextId > Number.MAX_SAFE_INTEGER) {
		result;
	  }
	  playlist.id = this.nextId;	
	  this.nextId = this.nextId + 1;
      result.copyFrom(playlist);
      this.playlists.push(result);
      return result;
    }
    return null;
  }
  
  remove(playlist: Playlist): Playlist {
	for (let i = 0; i < this.playlists.length; i++){	
		if (this.playlists[i].id == playlist.id) {
			var result = this.playlists[i];
			this.playlists.splice(i, 1);
			return result;
		}
	}  
    return new Playlist();
  }

  idAvailable(id: number): boolean {
    return !this.playlists.find(a => a.id == id);
  }
  
  nameAvailable(playlistName: string): boolean {
    return !this.playlists.find(a => a.playlistName == playlistName);
  }
  
  // Find a playlist object within our playlist repo given the playlist id
  // Used to find the desired playlist when adding or removing a song from it
  findPlaylistById(id: number): Playlist {
	for (var playlist of this.playlists) {
		if (playlist.id == id) {
			return playlist;
		}		
	}  
	return new Playlist();	  
  }
  
  // // SEARCH PLAYLIST BY NAME
  // searchPlaylist(name: string): Playlist {
  //   var result = this.playlists.find(a => a.playlistName == name);
  //   // if (result) result.copyFrom(song);
  //   if (typeof result === 'undefined'){
  //     result = new Playlist();
  //   }
  //   return result;
  // }

 // SEARCH PLAYLIST BY NAME
 searchPlaylist(name: string): Playlist {
  for (var playlist of this.playlists) {
		if (playlist.playlistName == name) {
      console.log("PLAYLIST"+name+playlist.playlistName);
			return playlist;
    }
  }
  var result = new Playlist();
  return result;
} 



  update(playlist: Playlist): Playlist {
    var result = this.playlists.find(a => a.id == playlist.id);
    if (result) result.copyFrom(playlist);
    if (typeof result === 'undefined'){
      result = new Playlist();
    }
    return result;
  }

  getPlaylists(): Playlist[] {
    return this.playlists;
  }
}
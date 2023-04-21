import { Album } from '../common/album';

export class AlbumRepository {
  albums: Album[] = [];

  add(album: Album): Album {
    var result = new Album();
    if (this.idAvailable(album.id) && this.nameAvailable(album.albumName)) {
      result = new Album();
      result.copyFrom(album);
      this.albums.push(result);
    }
    return result;
  }
  
  remove(album: Album): Album {
	for (let i = 0; i < this.albums.length; i++){	
		if (this.albums[i].id == album.id) {
			var result = this.albums[i];
			this.albums.splice(i, 1);
			return result;
		}
	}  
    return new Album();
  }

  idAvailable(id: number): boolean {
    return !this.albums.find(a => a.id == id);
  }
  nameAvailable(albumName: string): boolean {
    return !this.albums.find(a => a.albumName == albumName);
  }
  
  // Find a playlist object within our playlist repo given the playlist id
  // Used to find the desired playlist when adding or removing a song from it
  findAlbumById(id: number): Album {
	for (var album of this.albums) {
		if (album.id == id) {
			return album;
		}		
	}  
	return new Album();	  
  }
  
  // SEARCH ALBUM BY NAME
  searchAlbum(name: string): Album {
    var result = this.albums.find(a => a.albumName == name);
    if (typeof result === 'undefined'){
      result = new Album();
    }
    return result;
  }

  update(album: Album): Album {
    var result = this.albums.find(a => a.id == album.id);
    if (result){
      result.copyFrom(album);
    } else {
      result = new Album();
    }
    return result;
  }

  getAlbums(): Album[] {
    return this.albums;
  }
}
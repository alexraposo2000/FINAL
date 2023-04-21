import { Component, OnInit } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { Playlist } from '../../../common/playlist';
import { Song } from '../../../common/song';
import { LibraryService } from './library.service';
import { Router } from '@angular/router';

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
  
export class LibraryComponent implements OnInit {
  playlists: Playlist[] = [];	
  songlist: Song[] = [];
  currentPlaylistId: number = Number.MIN_VALUE;
  
  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef, private libraryService: LibraryService) {}
  
  /** Display this data when the page is rendered */
  ngOnInit(): void {
    this.libraryService.getPlaylists()
      .subscribe(
        pl => { this.playlists = pl; }, // next callback
        msg => { alert("Library service could not getPlaylists(): " + msg); } // error callback
      ); 
  }
  
  /** Add a playlist to the system given a playlist name chosen by the user */
  addPlaylist() {
    // Prompt user for the playlist name
    const playlistName = prompt("Enter a name for the new playlist:");
    if (playlistName && playlistName != "") {
      var playlist: Playlist = new Playlist();
      playlist.setName(playlistName);
	    this.libraryService.createPlaylist(playlist).subscribe(
		    pl => {
			    if (pl) {
				    this.playlists.push(pl);
			    } else {
				    alert("Playlist with this name already exists.");
			    }
		    },
		    msg => {alert("Library service could not createPlaylist(): " + msg);}
	    );
    } else {
		alert("Error: Playlist name cannot be empty.")
	}
  }
  
  /** Remove a user-created playlist from the entire system */
  removePlaylist() {
    // Get the currently selected playlist
    var activePlaylistBtn = document.querySelector(".playlist-btn-lib.active");
    if (activePlaylistBtn) {
      // Remove selected playlist from left side
      var id: number = Number(activePlaylistBtn.getAttribute("id"));
      this.libraryService.deletePlaylist(id).subscribe(
		    ret => {
			    if (ret == 0) {
				    for (let i = 0; i < this.playlists.length; i++) {	
					    if (this.playlists[i].id == id) {
						    this.playlists.splice(i, 1);
						    break;
					    }
		        }
		        this.songlist = [];  
		        this.currentPlaylistId = Number.MIN_VALUE;
			    } else {
				    alert("No such playlist exists with the given name.");
			    }
		    },
		    msg => {alert("Library service could not deletePlaylist(): " + msg);}
	    )
	  } else {
		  alert("First select a playlist to remove.");
	  }
  }

  /** Remove a song from the selected playlist */
  removeSong(event: any) {
	  // Get id of the song that was selected
		var songId: number = Number(event.target.getAttribute("id"));
		this.libraryService.removeSongFromPlaylist(songId, this.currentPlaylistId).subscribe(
		  updatedSongs => { 
			  if (updatedSongs) {
			  	this.songlist = updatedSongs;
			  } else {
				  alert("Either song/playlist does not exist, or song is not contained within this playlist.");
			  }
		  },
		  msg => {alert("Library service could not removeSongFromPlaylist(): " + msg);}	   
		);
  }
  
  /** Update song list based on which playlist was clicked */
  showSongs(event: any) {
    // Get name of playlist that was clicked
    const playlistName = event.target.innerText;
    if (playlistName != "") {	
      // Get list of songs for the selected playlist
      var playlistId: number = Number(event.target.getAttribute("id"));
      this.getSongsForPlaylist(playlistId);
      // Set the clicked button as active
      const playlistButtons = document.querySelectorAll('.playlist-btn-lib');
      playlistButtons.forEach(button => button.classList.remove('active'));
      event.target.classList.add('active');
      this.currentPlaylistId = playlistId;
    }
  }
  
  // Retrieve songs for a given playlist name
  private getSongsForPlaylist(playlistId: number) {
    this.libraryService.getPlaylistSongs(playlistId)
	  .subscribe(
		  sl => { this.songlist = sl; },
          msg => { alert("Library service could not getPlaylistSongs(): " + msg); }
      );
  }

  playSong(event: any, index: any) {
    var song: Song[] = [];
    song.push(this.songlist[index]);
    this.router.navigate(['/player'], { state: { song: song } });
  }

  playPlaylist() {
    var song: Song[] = this.songlist;
    this.router.navigate(['/player'], { state: { song: song } });
  }
}

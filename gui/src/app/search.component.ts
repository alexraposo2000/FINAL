import { Inject, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { songRepository, albumRepository } from '../../../common/song-album-creator';
import { Song } from '../../../common/song';
import { Album } from '../../../common/album';
import { Playlist } from '../../../common/playlist'
import { DOCUMENT } from '@angular/common';
import { LibraryService } from './library.service';
import { SearchService } from './search.service';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
  
export class SearchComponent implements OnInit {
  table!: HTMLTableElement;
  results: Song[] = [];

  constructor(private router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document, private libraryService: LibraryService, private searchService: SearchService) {}

  ngOnInit(): void {
    // Get a reference to the table element
    this.table = document.querySelector('#search-results table') as HTMLTableElement;
    // Scroll to top
    this.document.documentElement.scrollTo(0, 0);
  }

  // Retrieve results from search query
  search(event: any){
    // Prevent page from returning to base html (without search results)
    event.preventDefault();

    // Clear the table contents
    while (this.table.rows.length > 1) {
      this.table.deleteRow(1);
    }

    // Retrieve song/playlist/album name user entered
    var searchTerm = (document.getElementById("search-input") as HTMLInputElement).value;

    // Retrieve whether the user is searching for a song/album/playlist
    var searchType = (document.getElementById("search-type") as HTMLSelectElement).value;

    // Search for songs
    if (searchType == 'song') {
      var song_result: Song = songRepository.searchSong(searchTerm)
      
      // Display search results
      if (song_result.songName == ''){
        window.alert('No songs found.');
        var resultSubheader = document.getElementById("result-subheader");
        if (resultSubheader) resultSubheader.innerHTML = "";
      } else {
        this.display_search_results([song_result])
        this.results = [song_result]
        var resultSubheader = document.getElementById("result-subheader");
        if (resultSubheader) resultSubheader.innerHTML = '';
      }

    // Search for playlists
    } else if (searchType == 'playlist'){
      this.matchPlaylist(searchTerm);
      // var pl_result: Playlist = playlistRepository.searchPlaylist(searchTerm)
      // // Display search results
      // if (pl_result.playlistName == ''){
      //   window.alert('No albums found.');
      //   var resultSubheader = document.getElementById("result-subheader");
      //   if (resultSubheader) resultSubheader.innerHTML = "";
      // } else {
      //   this.display_search_results(pl_result.songs);
      //   this.results = pl_result.songs;
      //   var resultSubheader = document.getElementById("result-subheader");
      //   if (resultSubheader) resultSubheader.innerHTML = pl_result.playlistName + ' - ' + pl_result.playlistName;
      // }
		
    // Search for albums
    } else if (searchType == 'album'){
      var album_result: Album = albumRepository.searchAlbum(searchTerm)
      // Display search results
      if (album_result.albumName == ''){
        window.alert('No albums found.');
        var resultSubheader = document.getElementById("result-subheader");
        if (resultSubheader) resultSubheader.innerHTML = "";
      } else {
        this.display_search_results(album_result.songs);
        this.results = album_result.songs;
        var resultSubheader = document.getElementById("result-subheader");
        if (resultSubheader) resultSubheader.innerHTML = album_result.albumName + ' - ' + album_result.artistName;
      }
    }

    // Scroll to bottom of page to see search results
    // window.scrollTo(0,document.body.scrollHeight);
  }

  // Display search results
  display_search_results(results: Song[]) {
    // Clear the table contents
    while (this.table.rows.length > 1) {
      this.table.deleteRow(1);
    }
  
    // Iterate through each song in the results list
    results.forEach((result, index) => {
      // Create a new row
      const row = this.table.insertRow();
    
      // Create cells for the row
      const titleCell = row.insertCell();
      const artistCell = row.insertCell();
      const playlistCell = row.insertCell();
      const buttonCell = row.insertCell();
    
      // Set the text content for the cells
      titleCell.textContent = result.songName;
      artistCell.textContent = result.artistName;
      titleCell.classList.add('song-name');
      artistCell.classList.add('artist-name');
    
      // Create a dropdown for the playlists
      const playlistDropdown = document.createElement('select');
      playlistDropdown.classList.add('playlist-dropdown');
      playlistCell.appendChild(playlistDropdown);
      this.populate_playlists(playlistDropdown);
    
      // Create a button for adding the song to a playlist
      const addButton = document.createElement('button');
      addButton.classList.add('playlist-button');
      addButton.textContent = 'Add to Playlist';
      addButton.addEventListener('click', (event) => {
        // Get the selected playlist from the dropdown
        const playlistName = playlistDropdown.value;
        this.add_to_playlist(playlistName, result.id);
      });
      buttonCell.appendChild(addButton);
    
      // Create a button for playing the song
      const playButton = document.createElement('button');
      playButton.classList.add('play-button');
      playButton.textContent = 'Play';
      playButton.addEventListener('click', (event) => {
        this.play_song(event, index);
      });
      buttonCell.appendChild(playButton);
    });
  }
  
  // Play song
  play_song(event: any, song_idx: any){
    var song: Song[] = [];
    song.push(this.results[song_idx]);
    this.router.navigate(['/player'], { state: { song: song } });
  }
  
  matchPlaylist(playlistName: string) {
	  this.searchService.getMatchingPlaylist(playlistName).subscribe(
		playlist => {
			if (playlist.playlistName != "") {
				this.display_search_results(playlist.songs);
        		this.results = playlist.songs;
        		var resultSubheader = document.getElementById("result-subheader");
        		if (resultSubheader) resultSubheader.innerHTML = playlist.playlistName;
			} else {
				var resultSubheader = document.getElementById("result-subheader");
        		if (resultSubheader) resultSubheader.innerHTML = "";
				alert("No playlists found.");
			}
		},
		msg => {alert("Search service could not getMatchingPlaylist(): " + msg);}  
	  );
  }

  // Add song to playlist
  add_to_playlist(playlistName: string, songId: number){
  	this.searchService.addSongToPlaylist(playlistName, songId).subscribe(
		  sl => {
			  if (sl) {
				  alert("Song successfully added to playlist"); 
			  } else {
				  alert("This song is already contained within the playlist. No duplicates allowed."); 
			  }
		  },
		  msg => {alert("Search service could not addSongToPlaylist(): " + msg); }
	);
  }

  populate_playlists(playlistDropdown: HTMLSelectElement) {
    // Get the playlists from the LibraryService
    this.libraryService.getPlaylists().subscribe((playlistArr: Playlist[]) => {
      playlistArr.forEach(playlist => {
        const option = document.createElement('option');
        option.classList.add('dropdown-item')
        option.textContent = playlist.playlistName;
        option.value = playlist.playlistName;
        playlistDropdown.appendChild(option);
      });
      // Use the playlistArr here
    });
    // Iterate through each playlist and create an option for the dropdown 
  }
}

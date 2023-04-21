import express = require('express');

import bodyParser = require("body-parser");

import {Song} from '../common/song';
import {Playlist} from '../common/playlist';
import {PlaylistRepository} from './playlistrepository';
import {songRepository} from '../common/song-album-creator';

var taserver = express();

var playlistrepo: PlaylistRepository = new PlaylistRepository();

var allowCrossDomain = function(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

// Return all songs
taserver.get('/songs', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(songRepository.getSongs()));
})

// Create a new song
taserver.post('/song/create', function (req: express.Request, res: express.Response) {
  var song: Song = <Song> req.body; 
  song = songRepository.add(song);
  if (song) {
    res.send({"success": "Song successfully added."});
  } else {
    res.send({"failure": "Song could not be added."});
  }
})

// Return all playlists
taserver.get('/library', function (req: express.Request, res: express.Response) {
   console.log('Requesting playlist information from /library resource');
   res.send(JSON.stringify(playlistrepo.getPlaylists()));
})

// Create a new playlist
taserver.post('/library', function (req: express.Request, res: express.Response) {
   var playlist: Playlist = <Playlist> req.body; 
   playlist = playlistrepo.add(playlist);
   if (playlist) {
	   console.log('Successfully created playlist at /library resource');  
       res.send(JSON.stringify(playlist));
   } else {
     console.log('Failed /library resource request: Playlist with this name or id already exists or maximum number of playlists reached.'); 	   
     res.send({"failure": "Playlist with this name or id already exists."});
   }
})

// Delete playlist
taserver.delete('/library/delete/:id', function (req: express.Request, res: express.Response) {
  var playlist: Playlist = playlistrepo.findPlaylistById(Number(req.params.id));
  if (playlist) {
	var deleted = playlistrepo.remove(playlist);
  	if (deleted) {
		  console.log('Successfully deleted playlist at /library resource');   
    	res.send({"success": "Playlist successfully deleted."});
  	} else {
		  console.log('Failed /library delete resource request: Tried to remove non-existent playlist');  
    	res.send({"failure": "Playlist could not be deleted."});
  	}
  } else {
	  console.log('Failed /library delete resource request: Playlist does not exist');  
    res.send({"failure": "Playlist could not be deleted."});	  
  }
})

// Return all songs of a given playlist
taserver.get('/library/playlist-:id/songs', function (req: express.Request, res: express.Response) {
   var playlist: Playlist = playlistrepo.findPlaylistById(Number(req.params.id));
   if (playlist) {	
	   console.log('Successfully retrieved songs at /library/playlist-name/songs resource');
	   res.send(JSON.stringify(playlist.getSongs()));
   } else {
	   console.log('Failed /library/playlist-name/songs resource request: Tried to access non-existent playlist');
	   res.send({"failure": "No such playlist with this name"});
   }
})

// Remove song from playlist
taserver.put('/library/remove-song-:sid/from-playlist-:plid', function (req: express.Request, res: express.Response) {
  var songId: number = Number(req.params.sid);
  var playlistId: number = Number(req.params.plid);
  var playlist: Playlist = playlistrepo.findPlaylistById(playlistId);
  var song: Song = songRepository.findSongById(songId);
  if (playlist && song) {
	var removed: Song = playlist.removeSong(song);
	if (removed) {
		console.log('Successfully removed song at /library/remove-song-songId/from-playlist-playlistId resource');
		res.send(JSON.stringify(playlist.getSongs()));
	} else {
		console.log('Failed /library/remove-song-songId/from-playlist-playlistId resource request: Song is not a member of this playlist');
		res.send({"failure": "Song is not contained in this playlist."});
	}
  } else {
	console.log('Failed /library/remove-song-songId/from-playlist-playlistId resource request: Song or playlist does not exist');
    res.send({"failure": "Playlist data could not be updated."});
  }
})

// Add song to playlist
taserver.put('/search/add-song-:sid/to-playlist-:plName', function (req: express.Request, res: express.Response) {
  var songId: number = Number(req.params.sid);
  var playlistName: string = req.params.plName;
  var playlist: Playlist = playlistrepo.searchPlaylist(playlistName);
  var song: Song = songRepository.findSongById(songId);
  if (playlist && song) {
    var ret: Song = playlist.addSong(song);
	  if (ret) {
		  console.log('Successfully added song at /library/add-song-songId/to-playlist-playlistId resource');
      	  res.send(JSON.stringify(playlist.getSongs())); 
	  } else {
		  console.log('Failed /library/add-song-songId/to-playlist-playlistId resource request: Song already exists within this playlist');
		  res.send({"failure": "Song is already contained within the playlist. Duplicates are prohibited"});	 
	  }
  } else {
	  console.log('Failed /library/add-song-songId/to-playlist-playlistId resource request: Song or playlist does not exist');
      res.send({"failure": "Could not add song to playlist."});
  }
})

// Search for a playlist with matching name
taserver.get('/search/match-playlist-:pName', function (req: express.Request, res: express.Response) {
  var playlistName: string = req.params.pName;
  var playlist: Playlist = playlistrepo.searchPlaylist(playlistName);
  console.log('Requested information from resource /search/match-playlist-name');
  res.send(JSON.stringify(playlist));  
})

// Return a playlist given its id
taserver.get('/library/:id', function (req: express.Request, res: express.Response) {
   var playlist: Playlist = playlistrepo.findPlaylistById(Number(req.params.id));	
   if (playlist) {
	   res.send(JSON.stringify(playlist));
   } else {
	   res.send({"failure": "No such playlist with this ID."});
   }
})

var server = taserver.listen(3000, function () {
   console.log('Server listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { server, closeServer};

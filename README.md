# NCSU, CSC 510, Group 5: The "Song Spot" web application

**Please see instructions for running the application and all tests at the bottom of this page**

This is the repository of a project for CSC 510 at NCSU to demonstrate Software Engineering concepts learned by students taking a Software Engineering course.

"Song Spot" is a web application where users can search for albums, playlists, and songs. Users can create, modify, and delete playlists, which are customized collections of songs. After creating a playlist, users can add or remove songs to the playlist and consecutively play all songs in the playlist.

<!-- Instructions for use: -->

<!-- Please follow [Follow these setup instructions](https://github.ncsu.edu/aeraposo/510_FINAL_PROJECT/blob/20850340d818235a4f6bd9d33ad4e003d4e44eba/CONFIGURE_ENVIRONMENT.md) to setup your environment and launch the gui frontend of the Song Spot web application.

To launch the backend server of the Song Spot web application, follow the following steps:
- Be in the server directory
- Input command: `npm i`
- Input command: `npm start` -->

After setup is complete, which is detailed at the bottom of this page, the user will have access to the Song Spot application. The application has 4 pages (home, search, library, and player) that can be navigated to using the labeled buttons.

Functionality:

- Create a playlist: After navigating to your library page, click the create playlist button and provide a name for the playlist. The new, empty playlist will now appear in your library.

- Search: After navigating to the search page, click the dropdown menu to select whether you would like to search for a song, playlist, or album. Next, type in a keyword to search for matches. Browse and interact with the search results (play songs or add them to playlists, browse album or playlist contents, etc.)

- Add a song to a playlist: Select the add button where a song object is visible from the search page, after making a query.

- Remove a song from a playlist: Select the remove button from within the playlist in your library

- Delete a playlist: Select the delete button while viewing a playlist object on your library page.

- Play, pause, or skip a song: After selecting the play button on a song, playlist, or album, the user will be redirected to the player page. From this page, you may select play, pause, or skip. If a single song is being played, the skip buttons will restart the songs. If a playlist is being played, the skip buttons will play the next or previous song in the playlist.

Technology:

- The application is written in TypeScript (JavaScript with types)
- The front-end of the application uses angular (a JS framework)
- The back-end of the application uses Node.js (a JS runtime)

Relevant Files:

- song.ts: TypeScript class called "Song" that defines the properties and methods for a song object. The class has five properties: "id", "songName", "artistName", "albumId", and "length", all of which have default values. 

- playlist.ts: This is a TypeScript class called "Playlist" that defines the properties and methods for a playlist object. The class has four properties: "id", "creatorId", "playlistName", and "songs", where "songs" is an array of "Song" objects.

- album.ts: The Album class represents an album object. It includes properties such as id, albumName, artistName, and songs. The songs property is an array of Song objects.

- song-album-creator.ts: A TypeScript file that creates song objects, adds them to a SongRepository, and assigns them to albums. The code also creates Album and Playlist objects and adds them to their respective repositories.

- songrepository.ts: A TypeScript class that represents a SongRepository. This class has an array of Song objects and provides several methods to manipulate them. This class provides a simple interface for managing Song objects, allowing for the creation, deletion, and searching of songs in a repository.

- albumrepository.ts: This is a TypeScript code for an Album Repository class. The class contains various functions for adding, removing, updating, and searching for albums. The album objects are stored in an array called albums.

- playlistrepository.ts: This is a TypeScript code defining a PlaylistRepository class for managing playlists in the music application. The class has an array of playlists and a nextId number to keep track of the next ID to be assigned to a playlist. 

- serverNEW.ts:
  - This is a Node.js application that provides a REST API for managing a collection of songs and playlists. The code uses the Express framework for handling HTTP requests and responses. The application provides endpoints for adding, removing, and retrieving songs and playlists, as well as adding and removing songs from playlists.

  - The code defines a PlaylistRepository class that maintains a list of playlists and provides methods for adding, removing, and retrieving playlists. Similarly, a songRepository module provides methods for adding, removing, and retrieving songs.

  - The Express app is initialized with the allowCrossDomain middleware that sets the necessary headers to allow cross-origin resource sharing.

  - The app provides the following endpoints:

    - GET /songs which returns a list of all songs
    - POST /song/create which adds a new song to the collection
    - GET /library which returns a list of all playlists
    - POST /library which adds a new playlist to the collection
    - DELETE /library/delete/:id which removes a playlist from the collection
    - GET /library/playlist-:id/songs which returns a list of all songs in the specified playlist
    - PUT /library/remove-song-:sid/from-playlist-:plid which removes a song from the specified playlist
    - PUT /search/add-song-:sid/to-playlist-:plid which adds a song to the specified playlist
    - GET /playlist/:id which returns a playlist given an id
    
  - Each endpoint handler takes an Express Request object and a Response object as arguments, and sends a JSON response using the Response object. The handlers use methods provided by the PlaylistRepository and songRepository modules to manipulate the collection of songs and playlists.
  
**RUNNING INSTRUCTIONS:**

*Before running ANY files, please [follow these setup instructions](https://github.ncsu.edu/aeraposo/510_FINAL_PROJECT/blob/20850340d818235a4f6bd9d33ad4e003d4e44eba/CONFIGURE_ENVIRONMENT.md)!*

*If you are using a Mac and have trouble installing nvm, please use [these instructions](https://tecadmin.net/install-nvm-macos-with-homebrew/) to install *

  - Run Unit and Integration Tests
    - [Follow these instructions](https://github.ncsu.edu/aeraposo/510_FINAL_PROJECT/blob/main/server/spec/RUN_TESTS.md)
  - Run Acceptance/GUI Tests:
    - [Follow these instructions](https://github.ncsu.edu/CSC510-GROUP-PROJECT/510_FINAL_PROJECT/blob/5fc30e6164f7ae6cfddfa2486bb8d9e028eaa30a/tests-acceptance/CONFIGURE.md)
  - Lanching the Frontend (launch and use the application):
    - First, launch the server:
     - Change the directory to server
     - Run this if you’re on a Mac: `source ~/.zshrc`
     - Run this: `npm i`
     - Run this: `npm start`
    - [Follow these setup and launch instructions for the frontend in a new terminal (sumarized below)](https://github.ncsu.edu/aeraposo/510_FINAL_PROJECT/blob/20850340d818235a4f6bd9d33ad4e003d4e44eba/CONFIGURE_ENVIRONMENT.md)
     - In a new terminal, change your directory to gui
     - If you're running on a Mac, run this: `source ~/.zshrc`
     - Run `ng serve --open`
<!--   - Spec Test Files:
    - Instructions in: https://github.ncsu.edu/aeraposo/510_FINAL_PROJECT/blob/main/server/spec/RUN_TESTS.md -->
   <!--  - Need to have the frontend running
    - Need to have the server running
    - Be in the server directory
    - Input command: `npm run test` -->

<!--   - GUI:
    - Instructions in: https://github.ncsu.edu/aeraposo/510_FINAL_PROJECT/blob/main/gui/README.md -->

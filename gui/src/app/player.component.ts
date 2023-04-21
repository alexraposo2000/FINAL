import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Song } from './song.component';


@Component({
  selector: 'app-song-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class SongPlayerComponent implements OnInit, OnDestroy {
  private defaultSongData = {
    id: 0,
    songName: 'No song selected',
    artistName: 'Unknown artist',
    albumId: 0,
    length: 0
  };
  private defaultSong = new Song(this.defaultSongData);

  private timerSubscription: Subscription = new Subscription() ; // Subscription object used to manage the timer
  public isPlaying = false; // Boolean flag to track if the song is currently playing
  private timeRemaining = 0; // Time remaining in seconds for the song
  private currentTime = 0; // Current time in seconds for the song
  private readonly timerInterval = 1000; // 1 second
  private playlist: Song[] = []
  public currentSongIndex = 0; 
  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // Getters to retrieve the current song and the formatted time remaining
  currentSongs(): void  {
    this.playlist = history.state.song ? history.state.song: [];
  }

  get currentSong(): Song {
    if (this.playlist.length === 0) {
      return this.defaultSong;
    }
    else {
      const song = this.playlist[this.currentSongIndex]
      return song;
    }
  }

  get formattedTimeRemaining(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Initialize the time remaining when the component is created
  ngOnInit(): void {
    this.currentSongs()
    this.timeRemaining = this.currentSong.length;
    this.document.documentElement.scrollTo(0, 0);
  }
  
  // Stop the timer when the component is destroyed
  ngOnDestroy(): void {
    this.stopTimer();
  }

  // Toggle the play/pause state of the song
  togglePlayPause(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Skip back to the beginning of the current song
  skipBack(): void {
    this.stopTimer();
    this.currentSongIndex--;
    if (this.currentSongIndex < 0) {
      this.currentSongIndex = this.playlist.length - 1;
    }
    this.timeRemaining = this.currentSong.length;
    this.currentTime = 0;
    this.isPlaying = false;
    const img = document.getElementById('playPauseButton') as HTMLImageElement;
    img.src = 'assets/play.png';
  }

  // Skip forward to the next song in the playlist
  skipForward(): void {
    this.stopTimer();
    this.currentSongIndex++;
    if (this.currentSongIndex == this.playlist.length) {
      this.currentSongIndex = 0;
    }
    this.timeRemaining = this.currentSong.length;
    this.currentTime = 0;
    this.isPlaying = false;
    const img = document.getElementById('playPauseButton') as HTMLImageElement;
    img.src = 'assets/play.png';
    // TODO: Implement skip forward logic
  }

  // Start playing the song
  private play(): void {
    this.isPlaying = true;
    const img = document.getElementById('playPauseButton') as HTMLImageElement;
    img.src = 'assets/pause.png'
    this.timerSubscription = timer(0, this.timerInterval).subscribe(() => {
      this.timeRemaining--;
      this.currentTime++;

      if (this.timeRemaining <= 0) {
        this.stopTimer();
        this.isPlaying = false;
        this.skipForward();
      }
    });
  }

  // Pause the song
  private pause(): void {
    this.isPlaying = false;
    const img = document.getElementById('playPauseButton') as HTMLImageElement;
    img.src = 'assets/play.png' 
    this.stopTimer();
  }

  // Stop the timer and unsubscribe from the subscription object
  private stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      //this.timerSubscription = null;
    }
  }

  // Define properties for formattedTimeElapsed and elapsedBarWidth
  public get formattedTimeElapsed(): string {
    const minutes = Math.floor(this.currentTime / 60);
    const seconds = this.currentTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  public get elapsedBarWidth(): number {
    return (this.currentTime / this.currentSong.length) * 100;
  }
}

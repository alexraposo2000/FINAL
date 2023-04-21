import { Component, Input, Inject } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const SONG_DATA = new InjectionToken<any>('SONG_DATA');


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
})
export class Song {
  @Input() id: number;
  @Input() songName: string;
  @Input() artistName: string;
  @Input() albumId: number;
  @Input() length: number;

  constructor(@Inject(SONG_DATA) data: any) {
    this.id = data.id;
    this.songName = data.songName;
    this.artistName = data.artistName;
    this.albumId = data.albumId;
    this.length = data.length;
  }

 

 
}

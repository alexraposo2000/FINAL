export class Song {
  id: number = 0;
  songName: string = "";
  artistName: string = "";
  albumId: number = 0;
  length: number = 0;
  //TODO: use a Map<string, string>
  // goal_requirements: string = "";
  // goal_conf_management: string = "";

  setValues(songid: number, name: string, artName: string, albId: number, sLength: number) {
    this.id = songid;
    this.songName = name;
    this.artistName = artName;
    this.albumId = albId;
    this.length = sLength;
  }

  constructor() {
    this.clean();
  }

  clean(): void {
    this.id = 0;
    this.songName = "";
    this.artistName = "";
    this.albumId = 0;
    this.length = 0;
  }

  clone(): Song {
     var song: Song = new Song();
     song.copyFrom(this);
     return song;
  }

  copyFrom(from: Song): void {
     this.id = from.id;
     this.songName = from.songName;
     this.artistName = from.artistName;
     //TODO: refactor! easy to forget one case; this should be a loop.
     this.albumId = from.albumId;
     this.length = from.length;
  }

}
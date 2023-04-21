import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Song } from '../../../common/song';
import { Playlist } from '../../../common/playlist';

@Injectable()
export class SearchService {

	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	private taURL = 'http://localhost:3000';

	constructor(private http: HttpClient) { }

	addSongToPlaylist(playlistName: string, songId: number): Observable<Song[] | null> {
		return this.http.put<any>(this.taURL + `/search/add-song-${songId}/to-playlist-${playlistName}`, { headers: this.headers })
			.pipe(
				retry(2),
				map(res => { if (!res.failure) { return res; } else { return null; } })
			);
	}
	
	getMatchingPlaylist(playlistName: string): Observable<Playlist> {
		return this.http.get<Playlist>(this.taURL + `/search/match-playlist-${playlistName}`).pipe(retry(2));
	}
}

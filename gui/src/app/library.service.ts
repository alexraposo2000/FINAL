import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Playlist } from '../../../common/playlist';
import { Song } from '../../../common/song';

@Injectable()
export class LibraryService {

	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	private taURL = 'http://localhost:3000';

	constructor(private http: HttpClient) { }

	getPlaylists(): Observable<Playlist[]> {
		return this.http.get<Playlist[]>(this.taURL + "/library")
			.pipe(
				retry(2)
			);
	}
	
	getPlaylistSongs(id: number): Observable<Song[]> {
		return this.http.get<Song[]>(this.taURL + `/library/playlist-${id}/songs`)
			.pipe(
				retry(2)
			);
	}

	createPlaylist(playlist: Playlist): Observable<Playlist | null> {
		return this.http.post<any>(this.taURL + "/library", playlist, { headers: this.headers })
			.pipe(
				retry(2),
				map(res => { if (!res.failure) { return res; } else { return null; } })
			);
	}

	deletePlaylist(id: number): Observable<number> {
		return this.http.delete<any>(this.taURL + `/library/delete/${id}`, { headers: this.headers })
			.pipe(
				retry(2),
				map(res => { if (res.success) { return 0; } else { return 1; } })
			);
	}

	removeSongFromPlaylist(songId: number, playlistId: number): Observable<Song[] | null> {
		return this.http.put<any>(this.taURL + `/library/remove-song-${songId}/from-playlist-${playlistId}`, { headers: this.headers })
			.pipe(
				retry(2),
				map(res => { if (!res.failure) { return res; } else { return null; } })
			);
	}
}
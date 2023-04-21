import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryService } from './library.service';
import { SearchComponent } from './search.component';
import { LibraryComponent } from './library.component';
import { SongPlayerComponent } from './player.component';
import { SearchService } from './search.service';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LibraryComponent,
    SearchComponent,
    SongPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // Routing to different pages from buttons
    RouterModule.forRoot([
       { path: '', redirectTo: 'home', pathMatch: 'full' }, 
       {
       path: 'home',
       component: HomeComponent
       },
       {
        path: 'search',
        component: SearchComponent
       },
       {
        path: 'library',
        component: LibraryComponent,
       },
       {
        path: 'player',
        component: SongPlayerComponent
       }
    ])    
  ],
  providers: [LibraryService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

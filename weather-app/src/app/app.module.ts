import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//components
import { AppComponent } from './app.component';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';

//modules
import { AppRoutingModule } from './app-routing.module';

//material
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

//store
import { favReducer } from './store/fav.reducer';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { ErrorDialog } from './error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesListComponent,
    PageNotFoundComponent,
    TopBarComponent,
    ErrorDialog
  ], 
  entryComponents: [
    ErrorDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatInputModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatTooltipModule, 
    MatDialogModule,
    StoreModule.forRoot({ fav: favReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

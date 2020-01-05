import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

export interface info {
  id: string;
  city: string;
  weatherText: string;
  temCelsius: string;
  temFahrenheit: string;
}

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})

export class FavoritesListComponent implements OnInit {
  constructor(private store: Store<{ fav: [] }>
  ) {
    let obj;
    this.store.select(el => obj = el).subscribe();
    this.fav = obj.fav.fav;
  }

  fav: info[] = [];
  ngOnInit() {
  }
}
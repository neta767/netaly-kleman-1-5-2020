import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  isDarkTheme: boolean;

  constructor() { }

  changeTheme(theme: boolean) {
    this.isDarkTheme = theme;
  }
  ngOnInit() {
  }
}

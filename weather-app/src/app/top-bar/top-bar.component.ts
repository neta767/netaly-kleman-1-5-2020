import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Output() toogleDarkThemeEvent = new EventEmitter<boolean>();

  navLinks: any[];
  isDarkTheme: boolean = false;
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Home',
        link: './home',
        index: 0
      }, {
        label: 'Favorites',
        link: './favorites',
        index: 1
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  toggleDarkTheme(checked: boolean) {
    this.isDarkTheme = !this.isDarkTheme;
    this.toogleDarkThemeEvent.emit(checked);
  }

}

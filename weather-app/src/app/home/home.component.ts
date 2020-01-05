import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Store } from '@ngrx/store';
import { AddToFav, RemoveFromFav } from '../store/fav.actions';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialog } from '../error-dialog/error-dialog.component';

export interface info {
  id: string;
  city: string;
  weatherText: string;
  temCelsius: string;
  temFahrenheit: string;
}

export interface dayWeather {
  day?: string;
  temCelsius?: string;
  temFahrenheit?: string;
}

export interface cityInfo {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hasError = true;
  searchForm: FormGroup;
  city_id: string;
  metric: string = 'true';
  celsius: boolean = true;
  inFavList: boolean = false;

  currentWeather: info = {
    id: '',
    city: '',
    weatherText: '',
    temCelsius: '',
    temFahrenheit: '',
  }

  emptyForecast: dayWeather = { day: '', temCelsius: '', temFahrenheit: '' }
  weekForecast: dayWeather[] = [this.emptyForecast, this.emptyForecast, this.emptyForecast, this.emptyForecast, this.emptyForecast];

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private store: Store<{ fav: [] }>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      citySearch: ['', Validators.pattern('^[a-zA-Z \-\']+')]
    });

    if ((this.route.snapshot.paramMap.get('id')) != null && this.route.snapshot.paramMap.get('name') != null) {
      //update city info
      this.updateInfo(this.route.snapshot.paramMap.get('id'), this.route.snapshot.paramMap.get('name'))
    }
    else {
      //get loaction by coords
      navigator.geolocation.getCurrentPosition((success) => {
        this.rest.getGeopositionByCoords(success.coords.latitude.toString() + ',' + success.coords.longitude.toString())
          .subscribe(res => {
            this.updateInfo(res.Key, res.LocalizedName)
          },
            error => this.showError(error))
      });
    }
  }

  updateInfo(locationKey: string, name: string) {
    //get current weather in locationKey
    this.rest.getCurrentConditions(locationKey.toString()).subscribe(res => {
      this.currentWeather = {
        city: name,
        id: locationKey,
        temCelsius: res[0].Temperature.Metric.Value,
        temFahrenheit: res[0].Temperature.Imperial.Value,
        weatherText: res[0].WeatherText
      }
    },
      error => this.showError(error))

    //get 5 Days Forecasts in celsius
    this.rest.getForecasts(locationKey, 'true').subscribe(res => {
      for (let index = 0; index < 5; index++) {
        this.weekForecast[index] = {
          day: this.getDayInWeek(new Date(res.DailyForecasts[index].Date).getDay()),
          temCelsius: res.DailyForecasts[index].Temperature.Maximum.Value
        }
      }
    },
      error => this.showError(error))

    //get 5 Days Forecasts in fahrenheit
    this.rest.getForecasts(locationKey, 'false').subscribe(res => {
      for (let index = 0; index < 5; index++) {
        this.weekForecast[index] = {
          day: this.weekForecast[index].day,
          temCelsius: this.weekForecast[index].temCelsius,
          temFahrenheit: res.DailyForecasts[index].Temperature.Maximum.Value
        }
      }
      this.isOnTheFavoritesLise();
      this.hasError = false;
    },
      error => this.showError(error))
  }

  getDayInWeek(num: number): string {
    var dayNames = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', };
    return dayNames[num];;
  }

  onUnitTemChange(temUnit: string) {
    temUnit === 'c' ? this.celsius = true : this.celsius = false;
  }

  searchWeatherByName(cityName: string) {
    if (this.searchForm.invalid) {
      this.showError('Search is valid only in english');
      return;
    }
    this.rest.getAutocomplete(cityName).subscribe(res => {
      //update city info
      this.updateInfo(res[0].Key, res[0].LocalizedName);
    },
      error => this.showError(error))
  }

  isOnTheFavoritesLise() {
    setTimeout(() => {
      let obj: any;
      this.store.select(x => obj = x).subscribe();
      this.inFavList = obj.fav.fav.some(el => el.id === this.currentWeather.id);
    }, 0)
  }

  updateFavoritesLise() {
    if (!this.inFavList) {
      this.store.dispatch(new AddToFav(this.currentWeather));
    }
    else {
      this.store.dispatch(new RemoveFromFav(this.currentWeather));
    }
    this.inFavList = !this.inFavList;
  }

  showError(error: string) {
    this.hasError = true;
    if (this.dialog.openDialogs.length == 0) {
      this.dialog.open(ErrorDialog, {
        width: '250px',
        data: error
      })
    }
  }
}
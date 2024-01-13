import { Component, OnInit } from '@angular/core';
import { CovidService } from './services/covid.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'UdemySignalRAngularClient';
  columnNames = ['Tarih', 'İstanbul', 'Ankara', 'İzmir', 'Konya', 'Antalya'];
  options: any = { lengends: { position: 'Bottom' } };
  ChartType: ChartType = ChartType.LineChart;

  ngOnInit(): void {
    this.covidService.startConnection();
    this.covidService.startListener();
  }

  constructor(public covidService: CovidService) {}
}

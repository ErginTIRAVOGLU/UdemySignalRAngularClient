import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Covid } from '../models/covid.model';

@Injectable({
  providedIn: 'root',
})
export class CovidService {
  private hubConnection!: signalR.HubConnection;
  covidChartList = new Array();

  startInvoke() {
    this.hubConnection.invoke('GetCovidList').catch((err) => console.log(err));
  }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withAutomaticReconnect()
      .withUrl('https://localhost:7013/CovidHub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.startInvoke();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  startListener() {
    this.hubConnection.on('ReceiveCovidList', (covidCharts: Covid[]) => {
      this.covidChartList = [];
      covidCharts.forEach((item) => {
        this.covidChartList.push([
          item.covidDate,
          item.counts[0],
          item.counts[1],
          item.counts[2],
          item.counts[3],
          item.counts[4],
        ]);
      });
    });
  }
}

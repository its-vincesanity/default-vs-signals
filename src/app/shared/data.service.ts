import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { DataItem } from './data.models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private webSocket = webSocket<DataItem[]>('ws://localhost:9000');
  public readonly data$: Observable<DataItem[]> = this.webSocket.asObservable();
}

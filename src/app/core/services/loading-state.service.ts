import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {
  // public state$ = new Subject<boolean>();
  public state$ = new BehaviorSubject<boolean>(false);
  // state = this.state$.asObservable();
  private loadingCnt = 0;
  // public getState() {
  //   return this.state$;
  // }

  constructor() {}

  start() {
    this.loadingCnt++;
    setTimeout(() => {this.state$.next(true); }, 0);
  }

  end() {
    if (--this.loadingCnt === 0) {
      setTimeout(() => {this.state$.next(false); }, 0);
    }
  }
}

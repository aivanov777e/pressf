import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new Subject<boolean>();
  state = this.loadingSubject.asObservable();
  private loadingCnt = 0;

  constructor() {}

  start() {
    this.loadingCnt++;
    this.loadingSubject.next(true);
  }

  end() {
    if (--this.loadingCnt === 0) {
      this.loadingSubject.next(false);
    }
  }
}

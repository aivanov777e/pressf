import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingStateService } from './core/services/loading-state.service';
import { PrintService } from './core/services/print.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pressf';
  loading = true;
  subsLoading;

  constructor(
    public loadingStateService: LoadingStateService,
    public printService: PrintService
  ) { }

  ngOnInit() {
    // this.subsLoading = this.loadingService.state
    // .subscribe((state: boolean) => {
    //   this.loading = state;
    // });
  }

  ngOnDestroy() {
    // this.subsLoading.unsubscribe();
  }
}

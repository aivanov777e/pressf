import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

export interface CanComponentDeactivate {
  //pageFormGroups: FormGroup[];
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(
    private dialog: MatDialog,
  ) { }

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!(component.canDeactivate ? component.canDeactivate() : true)) {
          const ConfirmRef = this.dialog.open(ConfirmDialogComponent, {
            width: '550px',
            data: {
              message: `Вы действительно хотите выйти без сохранения изменений?`,
              title: 'Внимание'
            }
          });
          return ConfirmRef.afterClosed()
            .pipe(
              map(
                result => {
                  if (result === true) {
                    return true;
                  }
                  return false;
                }
              ),
              catchError((error: any) => {
                return of(false);
              })
           );
        } else {
          //return of(true);
          return true;
        }
    
    //return true;
  }
  
}

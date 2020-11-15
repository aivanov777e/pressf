import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFC = new FormControl('', [Validators.required]);
  passwordFC = new FormControl('', [Validators.required]);

  constructor(
    private auth: AuthService,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  authorization() {
    this.auth.authorization(this.loginFC.value, this.passwordFC.value)
    .subscribe(
      data => {
        // this.router.navigate([this.returnUrl]);
        this.location.back();
      }
    );
  }
}





// import { Component, OnInit } from '@angular/core';

// // import { Component, OnInit, Injector, HostListener } from '@angular/core';
// // import { Router, ActivatedRoute } from '@angular/router';
// // import { FormControl, Validators } from '@angular/forms';

// // import { TranslateService } from '@ngx-translate/core';

// // import { AuthService } from '../../shared/services/services/auth.service';
// // import { AccountService } from '../../shared/services/services/account.service';
// // import { PrincipalService } from 'src/app/shared/services/services/principal.service';
// // import { take, switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {

//   // constructor() { }

//   // ngOnInit(): void {
//   // }

//     model: any = {};
//     error = '';
//     returnUrl: string;

//     lang: any;
//     auth: AuthService;
//     account: AccountService;

//     accountFormControl = new FormControl('', [Validators.required]);
//     passwordFormControl = new FormControl('', [Validators.required]);

//     browserInput = '';
//     showRememberMe = false;
//     rememberMe = false;

//     constructor(
//         private injector: Injector,
//         private route: ActivatedRoute,
//         private principalSrv: PrincipalService,
//         private router: Router
//     ) {
//         const translateService = this.injector.get(TranslateService);
//         this.auth = this.injector.get(AuthService);
//         this.account = this.injector.get(AccountService);
//         this.lang = translateService.getDefaultLang();
//     }

//     ngOnInit() {
//         this.auth.logout();
//         this.returnUrl = (this.route.snapshot.queryParams && this.route.snapshot.queryParams.returnUrl) || '/';
//     }

//     // Добавлено событие предзагрузки модулей, после аутентификации
//     authenticate() {
//         this.auth.authentication(this.accountFormControl.value, this.passwordFormControl.value)
//             .pipe(
//                 take(1),
//                 // switchMap(() => this.account.get()),
//                 // switchMap(() => this.principalSrv.getPageTree()),
//             )
//             .subscribe(
//                 (res) => {
//                     this.principalSrv.preloadModules.emit('preload');
//                     // const lang = res.locale ? res.locale.mnemonic : 'ru';
//                     // localStorage.setItem('currentLanguage', lang);
//                     // this.translateSrv.setDefaultLang(lang);
//                     // this.translateSrv.use(lang);
//                     this.router.navigate([this.returnUrl]);
//                 },
//                 (error) => {
//                     console.error(`LoginComponent > authenticate > auth.authentication : ${JSON.stringify(error)}`);
//                 }
//             );
//     }

//     @HostListener('window:keydown', ['$event'])
//     handleKeyDown(event: KeyboardEvent) {
//         if (event.key) {
//             this.browserInput += event.key;
//             if (this.browserInput.includes('rememberme')) {
//                 this.showRememberMe = true;
//             }
//             if (this.browserInput.length > 40) {
//                 this.browserInput = '';
//             }
//         }
//     }
// }

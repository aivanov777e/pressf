# Pressf

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

heroku config:set NGINX_WORKERS=1

heroku config:set API_URL=https://pressb.herokuapp.com/
Set your API's prefix path (Default: /api/):

heroku config:set API_PREFIX_PATH=/pressb/
npm i -g heroku
heroku local
heroku ps:scale web=0 // heroku ps:scale web=1
heroku logs --tail
git push heroku master
heroku open
heroku config
heroku config:set RECREATE_DB=1
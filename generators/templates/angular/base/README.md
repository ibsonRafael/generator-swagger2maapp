# Base

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## https://medium.com/@adrianfaciu/barrel-files-to-use-or-not-to-use-75521cd18e65
Similar structure for a feature module:
+feature
    actions
    componentes
    effects
    models
    reducers
    routing
    services
    feature.modules.ts



## Custom preloading strategy for Angular modules
https://medium.com/@adrianfaciu/custom-preloading-strategy-for-angular-modules-b3b5c873681a
https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb
https://alligator.io/angular/preloading/
Lets say we have a medium sized Angular application and each large 
feature split into a lazy loaded module.





When the application starts, we load only the main modules and all the 
routes are lazy loaded, including the first one that we navigate to.

## Book: TypeScript Deep Dive
https://basarat.gitbooks.io/typescript/content/docs/tips/barrel.html

## ngrx
https://blog.realworldfullstack.io/real-world-app-part-18-revisiting-ngrx-e20feed6312c

## Barrel files: to use or not to use ?
https://medium.com/@adrianfaciu/barrel-files-to-use-or-not-to-use-75521cd18e65


## Documentation
https://compodoc.app/guides/getting-started.html
https://nhnent.github.io/tui.jsdoc-template/latest/

#### Install compodoc with npm
```javascript
$ npm install -g @compodoc/compodoc
```

#### Run compodoc in your project and serve it
```javascript
$ compodoc src -s
```

# Assumptions:

1. Appointments are between two users only,each user having a unique id
2. Each appointment has a unique id.The appointment id is one more than its positions in an appointment objects array
3. The appointment data model is applicable
4. json-mock backend database running on localhost:3000

# Following have not yet been done:

1. acceptance of an appointment by the "acceptor" that changes the appointment status to confirmed
2. getting user list from DB as a dropdown list when choosing whom to have the appointment with
3. http put request through angular 4 http.put method. Currently it is using basic javascript fetch method. I have not been able to make http put requests through angular work
4. consistent settings on date and time; it is UTC time in some places and local time in others
5. robust working of google maps api; currently only safe easily spotted landmarks will work against the APIs; no error handling has been implemented
6. dragging of events from one day to another
7. deletion of appointments 


# Poc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


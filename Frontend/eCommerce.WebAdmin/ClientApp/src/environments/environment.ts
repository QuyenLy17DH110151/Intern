// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'https://localhost:44368/api',
    firebase: {
        apiKey: 'AIzaSyDOqv10tI4fMDwg0DQZT-UZU1aef1r8l9k',
        authDomain: 'test-feature-image.firebaseapp.com',
        projectId: 'test-feature-image',
        storageBucket: 'test-feature-image.appspot.com',
        messagingSenderId: '67130930498',
        appId: '1:67130930498:web:c289db31976cf00c1c84db',
        measurementId: 'G-JWFYD93KQS',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

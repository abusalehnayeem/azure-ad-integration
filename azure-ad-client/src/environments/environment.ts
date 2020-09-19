// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: 'b9535469-bbe7-4a66-8823-4fef098be78e',
  authority: 'https://login.microsoftonline.com/c1ec3067-d41e-4053-b90c-d7619dae7650/',
  // authority: 'https://login.microsoftonline.com/organizations',
  redirectUrl: 'http://localhost:4200',
  postLogoutRedirectUri: 'http://localhost:4200/exit'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/* global Package, Npm */
Package.describe({
  name: 'jss:google-cloud-storage',
  version: '0.0.1',
  summary: 'Google Cloud Storage API client',
  git: 'https://github.com/JSSolutions/meteor-google-cloud-storage',
});

// eslint-disable-next-line prefer-arrow-callback
Package.onUse(function onUse(api) {
  api.versionsFrom('1.4');
  api.mainModule('connector-server.js', 'client');
});

Npm.depends({
  'google-oauth-jwt': '0.2.0',
});

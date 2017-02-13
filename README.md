# Google Cloud Storage API Client

Google Cloud Storage API Client for Meteor.

## Quick example

```js
//initialize client
var authOptions = {
  serviceEmail: CloudSettings.SERVICE_EMAIL,
  pemFile: CloudSettings.PEM_FILE, //PEM file name located in `/private` directory
  projectName: 'MyProjectName' //name of your project in google developer console
};

var cloudStorageClient = new GoogleCloudStorage(authOptions); //create new client instance
```


## Getting PEM file

This package is built on top of `google-oauth-jwt` npm package. Here's [detailed instruction](https://www.npmjs.com/package/google-oauth-jwt#creating-a-service-account-using-the-google-developers-console) how to generate `.pem` file.

-------------


Made by [![Professional Meteor Development Studio](http://s30.postimg.org/jfno1g71p/jss_xs.png)](http://jssolutionsdev.com) - [Professional Meteor Development Company](http://jssolutionsdev.com)

# Google Cloud Storage API Client

Google Cloud Storage API Client for Meteor.

__Right now only remove file method is implemented__

## Quick example

```js
//initialize client
var authOptions = {
  email: CloudSettings.SERVICE_EMAIL,
  keyFile: CloudSettings.PEM_FILE, //PEM file name located in `/private` directory
};

var cloudStorageClient = new GoogleCloudStorage(authOptions); //create new client instance

// remove file
cloudStorageClient.removeFile('test_file_to_remove.txt');
```


## Getting PEM file

This package is built on top of `google-oauth-jwt` npm package. Here's [detailed instruction](https://www.npmjs.com/package/google-oauth-jwt#creating-a-service-account-using-the-google-developers-console) how to generate `.pem` file.

-------------


Made by [![Professional Meteor Development Studio](http://s30.postimg.org/jfno1g71p/jss_xs.png)](http://jssolutionsdev.com) - [Professional Meteor Development Company](http://jssolutionsdev.com)

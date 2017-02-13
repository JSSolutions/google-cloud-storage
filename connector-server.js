import Request from 'request';
// eslint-disable-next-line import/no-unresolved
import { TokenCache } from 'google-oauth-jwt';
import fs from 'fs';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';


const GOOGLE_AUTH_SCOPES = ['https://www.googleapis.com/auth/devstorage.read_write'];

const tokens = new TokenCache();
const syncGetTokenFn = Meteor.wrapAsync(tokens.get, tokens);


class GoogleCloudStorage {
  constructor({ bucket, email, keyFile, scopes = GOOGLE_AUTH_SCOPES }) {
    this._bucket = bucket;
    this._authOptions = { email, keyFile: this._assetsFolderAbsolutePath(keyFile), scopes };
  }

  _generateAuthCredentials() {
    const token = syncGetTokenFn(this._authOptions);

    return {
      token,
      type: 'Bearer',
    };
  }

  _assetsFolderAbsolutePath(fileName) {
    const meteorRoot = fs.realpathSync(`${process.cwd()}/../`);

    const assetsFolder = `${meteorRoot}/server/assets/app`;

    if (fileName) {
      return `${assetsFolder}/${fileName}`;
    }

    return assetsFolder;
  }

  _getAuthHeaders() {
    const accessCredentials = this._generateAuthCredentials();
    return {
      Authorization: `${accessCredentials.type} ${accessCredentials.token}`,
    };
  }

  makeRequestToGoogleStorage(requestMethod, url, headers) {
    try {
      return HTTP.call(
        requestMethod,
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            ...this._getAuthHeaders(),
            ...headers,
          },
        }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error while requesting Google Api', error);
      return false;
    }
  }

  upload(fileStream, fileName, type, length, callback) {
    const options = {
      url: `https://www.googleapis.com/upload/storage/v1/b/${this._bucket}/o?uploadType=media&name=${fileName}`,
      headers: {
        ...this._getAuthHeaders(),
        'Content-Type': type,
        'Content-Length': length,
      },
    };

    fileStream.pipe(Request.post(options, callback));
  }
}

export { GoogleCloudStorage };

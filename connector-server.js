// eslint-disable-next-line import/no-unresolved
import { TokenCache } from 'google-oauth-jwt';
import fs from 'fs';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';


const GOOGLE_AUTH_SCOPES = ['https://www.googleapis.com/auth/devstorage.read_write'];

const tokens = new TokenCache();
const syncGetTokenFn = Meteor.wrapAsync(tokens.get, tokens);


class GoogleCloudStorage {
  constructor({ email, keyFile, scopes = GOOGLE_AUTH_SCOPES }) {
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

  makeRequestToGoogleStorage(requestMethod, url) {
    const accessCredentials = this._generateAuthCredentials();

    try {
      return HTTP.call(
        requestMethod,
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${accessCredentials.type} ${accessCredentials.token}`,
          },
        }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error while requesting Google Api', error);
      return false;
    }
  }
}

export { GoogleCloudStorage };

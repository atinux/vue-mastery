# Vue Mastery

> Vue Mastery is using Nuxt and Firebase to auth users without a server

## Requirements

We need to install firebase tools to deploy.

``` bash
$ npm install -g firebase-tools
```

## Firebase Setup

Because we don't want to share Firebase credential we need to create a `firebase.js` file in the root of the project. It will look something like this:

```js
module.exports = {
  'apiKey': 'info-from-firebase-web-instructions',
  'authDomain': 'info-from-firebase-web-instructions',
  'databaseURL': 'info-from-firebase-web-instructions',
  'projectId': 'info-from-firebase-web-instructions',
  'storageBucket': 'info-from-firebase-web-instructions',
  'messagingSenderId': 'info-from-firebase-web-instructions'
}
```

#### Rules

In order to keep other users from writing to paths they don't own, we need to add some rules to the database:

```json
{
  "rules": {
    "accounts": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

#### Social Logins

We will setup social login for Google and Github. We will need to login to your Firebase console and enable those signin methods. Google will work out-of-the-box with any Firebase app. But we will need to create a new oAuth application if we would like to use Github signin.

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate

# deploy solution to firebase
$ firebase deploy
```

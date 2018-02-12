# Vue Mastery

> The ultimate learning resource for Vue developers

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


``` bash
# install dependencies
$ npm install # Or yarn install
```

### Prerequisites

We need to install firebase tools to deploy.

``` bash
$ npm install -g firebase-tools
```

### Firebase Setup

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

#### Configuration keys

To use MailerLite, SparkPost, and stripe we need to configure enviroment keys using this command:

``` bash
$ firebase functions:config:set mailerlite.key="THE KEY"
$ firebase functions:config:set sparkpost.key="THE KEY"
$ firebase functions:config:set stripe.token="THE KEY"
```
To list the current config:

``` bash
$ functions:config:get
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

## Test

We use Cypress to test 

``` bash
$(npm bin)/cypress open
```

## Usage

### Development

``` bash
# serve with hot reloading at localhost:3000
$ npm run dev
```

Go to [http://localhost:3000](http://localhost:3000)

### Production

This is just in case we want to deploy on differrent server then firebase hosting

``` bash
# build for production and launch the server
$ npm run build
$ npm start
```

### Generate

``` bash
# generate a static project
$ npm run generate
```

## Deployment

You should probably generate the static porject before you deploy as the deployment take every static output from nuxt to the dist folder, which is then copy over to firebase host folder.
The functions folder is also copy over and help us to repsond to specific backend tasks.

``` bash
# deploy solution to firebase
$ firebase deploy
```

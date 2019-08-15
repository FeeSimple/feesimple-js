# feesimple-js

[![Build Status](https://travis-ci.org/Qix-/color-string.svg?branch=master)](https://github.com/FeeSimple/feesimple-js)

> Library for interacting with XFS blockchain network

## Install

With [npm](http://npmjs.org/):

```console
$ npm install feesimple-js
```

With [yarn](https://yarnpkg.com):

```console
$ yarn add feesimple-js
```

## Usage

### Initialization at server side

```js
const FeeSimple = require('feesimple-js');
const feesimpleClient = FeeSimple();
```

### Initialization at client side

```js
import FeeSimple from 'feesimple-js';
const feesimpleClient = FeeSimple();
```

### Get Availability Data

async/await

```js
try {
  const accountName = 'usertrung123';
  const availabilityData = await feesimpleClient.getAvailabilityData(accountName);
  console.log('availabilityData:', JSON.stringify(availabilityData, null, 2));
} catch (err) {
  console.log(err);
}
```

Promise

```js
const accountName = 'usertrung123';
feesimpleClient.getAvailabilityData(accountName)
  .then(availabilityData => {
    console.log('availabilityData:', JSON.stringify(availabilityData, null, 2));
  })
  .catch(err => {
    console.log(err);
  })
```

### Browserified Usage

#### Bundle file

  - Download link: https://github.com/FeeSimple/feesimple-js/tree/master/bundle/feesimple.bundle.js
  - The bundle file `feesimple.bundle.js` can be embedded into HTML code by using the `<script src="...">` tag

#### HTML sample code

```
<!DOCTYPE html>
<html>
  <body>

  <h2>Testing of the <i>feesimple.bundle.js</i></h2>

  <pre style="width: 100%; height: 100%; margin:0px; "></pre>

  <script src="./feesimple.bundle.js"></script>

  <script>
    let pre = document.getElementsByTagName('pre')[0];

    // Can enable to use either "async/await" style or Promise style

    // async/await
    // (async () => {
    //   try {
    //     const feesimpleClient = FeeSimple();
    //     const accountName = 'usertrung123';
    //     const availabilityData = await feesimpleClient.getAvailabilityData(accountName);
    //     pre.textContent += `getAvailabilityData for account: ${accountName} \n` + JSON.stringify(availabilityData, null, 2);
    //   } catch (err) {
    //     pre.textContent += err;
    //   }
    // })();

    // Promise
    (() => {
      const feesimpleClient = FeeSimple();
      const accountName = 'usertrung123';
      feesimpleClient.getAvailabilityData(accountName)
        .then(availabilityData => {
          pre.textContent +=`getAvailabilityData for account: ${accountName} \n` + JSON.stringify(availabilityData, null, 2);
        })
        .catch(err => {
          pre.textContent += err;
        })
    })();
  </script> 

  </body>
</html>
```
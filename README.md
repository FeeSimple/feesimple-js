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
const accountName = 'usertrung123';
const availabilityData = await feesimpleClient.getAvailabilityData(accountName);
console.log('availabilityData:', JSON.stringify(availabilityData, null, 2));
```

Promise

```js
const accountName = 'usertrung123';
feesimpleClient.getAvailabilityData(accountName)
  .then(availabilityData => {
    console.log('availabilityData:', JSON.stringify(availabilityData, null, 2));
  })
```
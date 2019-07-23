# feesimple-js

[![Build Status](https://travis-ci.org/Qix-/color-string.svg?branch=master)](https://github.com/FeeSimple/feesimple-js)

> Library for interacting with XFS blockchain network

## Install

With [npm](http://npmjs.org/):

```console
$ npm install feesimple-js
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

```js
const accountName = 'usertrung123';
const availabilityData = await feesimpleClient.getAvailabilityData(accountName);
```
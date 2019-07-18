'use strict';

const Eos = require('eosjs');
const { FSMGRCONTRACT, PROPERTY } = require('./consts');

const feeSimpleChainConf = {
  chainId: '1c6ae7719a2a3b4ecb19584a30ff510ba1b6ded86e1fd8b8fc22f1179c622a32',
  httpEndpoint: 'http://feesimpletracker.io:8877',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  sign: true
};

function FeeSimpleJs() {
  if (!(this instanceof FeeSimpleJs)) {
		return new FeeSimpleJs();
  }

  this.eosClient = Eos(feeSimpleChainConf);
}

FeeSimpleJs.prototype = {
  getProperty: async function (accountName) {
    const { rows } = await this.eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountName,
      PROPERTY
    );

    return rows;
  },
};

module.exports = FeeSimpleJs;
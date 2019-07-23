'use strict';

const Eos = require('eosjs');
const { 
  FSMGRCONTRACT, PROPERTY, PROPERTYIMG,
  FLOORPLAN, FLOORPLANIMG, UNIT, UNITIMG 
} = require('./consts');
const { 
  checkAccountNameError, mapPropertyToFloorplanList, mapPropertyToUnitList 
} = require('./helper');

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
  getWhat: async function (accountName, what) {
    if (what !== PROPERTY && what !== PROPERTYIMG && 
        what !== FLOORPLAN && what !== FLOORPLANIMG && 
        what !== UNIT && what !== UNITIMG) {
      throw TypeError('Invalid type');
    }
    const accountNameErr = checkAccountNameError(accountName);
    if (accountNameErr) {
      throw TypeError(accountNameErr);
    }
    const { rows } = await this.eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountName,
      what
    );
    return rows;
  },
  getPropertyList: async function (accountName) {
    return this.getWhat(accountName, PROPERTY);
  },
  getPropertyImgList: async function (accountName) {
    return this.getWhat(accountName, PROPERTYIMG);
  },
  getFloorplanList: async function (accountName) {
    return this.getWhat(accountName, FLOORPLAN);
  },
  getFloorplanImgList: async function (accountName) {
    return this.getWhat(accountName, FLOORPLANIMG);
  },
  getUnitList: async function (accountName) {
    return this.getWhat(accountName, UNIT);
  },
  getUnitImgList: async function (accountName) {
    return this.getWhat(accountName, UNITIMG);
  },
  getAvailabilityData: async function (accountName) {
    // Define data format ///
    let availabilityData = [];  // list of properties

    const propertyList = await this.getPropertyList(accountName);
    if (!propertyList || propertyList.length === 0) {
      throw Error('No property found!');
    }

    const floorplanList = await this.getFloorplanList(accountName);
    const propertyToFloorplanList = mapPropertyToFloorplanList(floorplanList);
    
    const unitList = await this.getUnitList(accountName);
    const propertyToUnitList = mapPropertyToUnitList(unitList);

    for (let i=0; i<propertyList.length; i++) {
      let returnedProperty = {
        "id": "",
        "name": "",
        "created_at": "",
        "floor_plans": [],
        "units": []
      };

      returnedProperty.id = propertyList[i].id;
      returnedProperty.name = propertyList[i].name;
      returnedProperty.created_at = "";
      returnedProperty.floor_plans = propertyToFloorplanList[propertyList[i].id] || [];
      returnedProperty.units = propertyToUnitList[propertyList[i].id] || [];

      availabilityData.push(returnedProperty);
    }

    return availabilityData;
  },
};

module.exports = FeeSimpleJs;
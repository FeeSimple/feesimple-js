'use strict';

const Eos = require('eosjs');
const { 
  FSMGRCONTRACT, PROPERTY, PROPERTYIMG,
  FLOORPLAN, FLOORPLANIMG, UNIT, UNITIMG 
} = require('./consts');
const { checkAccountNameError } = require('./helper');

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
  getProperty: async function (accountName) {
    return this.getWhat(accountName, PROPERTY);
  },
  getPropertyImg: async function (accountName) {
    return this.getWhat(accountName, PROPERTYIMG);
  },
  getFloorplan: async function (accountName) {
    return this.getWhat(accountName, FLOORPLAN);
  },
  getFloorplanImg: async function (accountName) {
    return this.getWhat(accountName, FLOORPLANIMG);
  },
  getUnit: async function (accountName) {
    return this.getWhat(accountName, UNIT);
  },
  getUnitImg: async function (accountName) {
    return this.getWhat(accountName, UNITIMG);
  },
  getAvailabilityData: async function (accountName) {
    // Define data format ///
    let availabilityData = [];  // list of properties

    let returnedProperty = {
      "id": "",
      "name": "",
      "created_at": "",
      "floor_plans": [],
      "units": []
    };

    let returnedFloorplan = {
      "floor_plan_id": "",
			"title": "",
			"bedrooms": "",
			"bathrooms": "",
			"sq_ft_min": "",
			"sq_ft_max": "",
			"rent_min": "",
			"rent_max": "",
			"deposit": "",
			"images": []
    };

    let returnedUnit = {
      "unit_id": "",
			"floor_plan": "",
			"bedrooms": "",
			"bathrooms": "",
			"sq_ft_min": "",
			"sq_ft_max": "",
			"rent_min": "",
			"rent_max": "",
			"occupancy_status": "",
			"leased_status": "",
      "date_available": "",
      "images": []
    };
    /////////////////////////

    const property = this.getProperty(accountName);
    if (!property || property.length === 0) {
      throw Error('No property found!');
    }

    const floorplan = this.getFloorplan(accountName);
    const unit = this.getUnit(accountName);

    for (let i=0; i<property.length; i++) {
      returnedProperty.id = property[i].id;
      returnedProperty.name = property[i].name;
      returnedProperty.created_at = "";


    }
  },
};

module.exports = FeeSimpleJs;
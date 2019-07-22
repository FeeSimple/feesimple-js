const checkAccountNameError = accountName => {
  let errMsg = null
  const accountRegex = /^[a-z1-5]*$/
  if (!accountName) {
    errMsg = 'Account name empty or null'
  } else if (accountName.length !== 12) {
    errMsg = 'Must be 12 symbols long'
  } else if (!accountRegex.test(accountName)) {
    errMsg = 'Must include symbols a-z 1-5'
  } else {
  }
  return errMsg
}

// Convert data format
const getReturnedFloorplan = floorplan => {
  let returnedFloorplan = {
    "floor_plan_id": floorplan.id,
    "title": floorplan.name,
    "bedrooms": floorplan.bedrooms,
    "bathrooms": floorplan.bathrooms,
    "sq_ft_min": floorplan.sq_ft_min,
    "sq_ft_max": floorplan.sq_ft_max,
    "rent_min": floorplan.rent_min,
    "rent_max": floorplan.rent_max,
    "deposit": floorplan.deposit,
    "images": []
  };

  return returnedFloorplan;
}

const mapPropertyToFloorplan = (floorplanList) => {
  let returnedMap = {};

  for (let i=0; i<floorplanList.length; i++) {
    // Convert data format
    let returnedFloorplan = getReturnedFloorplan(floorplanList[i]);

    // Add floorplan entry according to propertyId 
    if (!returnedMap[floorplanList[i].property_id]) {
      returnedMap[floorplanList[i].property_id] = [returnedFloorplan];
    } else {
      returnedMap[floorplanList[i].property_id].push(returnedFloorplan);
    }
  }

  return returnedMap;
}

module.exports = {
  checkAccountNameError,
  mapPropertyToFloorplan
};
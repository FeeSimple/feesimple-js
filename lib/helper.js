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

const appendLeadingZeroes = (n) => {
  if(n <= 9){
    return "0" + n;
  }
  return n
}

// Convert data format
const getReturnedUnit = unit => {
  let current_datetime = new Date(parseInt(unit.date_available, 10))
  let formatted_date = current_datetime.getFullYear() + "-"
  formatted_date += appendLeadingZeroes(current_datetime.getMonth() + 1) + "-" + appendLeadingZeroes(current_datetime.getDate())

  let returnedUnit = {
    "unit_id": unit.id,
    "title": unit.name,
    "floor_plan": "",
    "bedrooms": unit.bedrooms,
    "bathrooms": unit.bathrooms,
    "sq_ft_min": unit.sq_ft_min,
    "sq_ft_max": unit.sq_ft_max,
    "rent_min": unit.rent_min,
    "rent_max": unit.rent_max,
    "occupancy_status": "",
    "leased_status": unit.status,
    "date_available": formatted_date,
    "images": []
  };

  return returnedUnit;
}

const mapPropertyToFloorplanList = (floorplanList) => {
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

const mapPropertyToUnitList = (unitList) => {
  let returnedMap = {};

  for (let i=0; i<unitList.length; i++) {
    // Convert data format
    let returnedUnit = getReturnedUnit(unitList[i]);

    // Add floorplan entry according to propertyId 
    if (!returnedMap[unitList[i].property_id]) {
      returnedMap[unitList[i].property_id] = [returnedUnit];
    } else {
      returnedMap[unitList[i].property_id].push(returnedUnit);
    }
  }

  return returnedMap;
}

module.exports = {
  checkAccountNameError,
  mapPropertyToFloorplanList,
  mapPropertyToUnitList
};
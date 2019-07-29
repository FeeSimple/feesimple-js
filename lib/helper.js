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

const appendLeadingZeroes = (n) => {
  if(n <= 9){
    return "0" + n;
  }
  return n
}

const timestamp2String = timestamp => {
  let datetime = new Date(parseInt(timestamp, 10))
  let dateStr = datetime.getFullYear() + "-"
  dateStr += appendLeadingZeroes(datetime.getMonth() + 1) + "-" + appendLeadingZeroes(datetime.getDate())
  return dateStr
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

// Convert data format
const getReturnedUnit = unit => {
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
    "date_available": timestamp2String(unit.date_available),
    "images": []
  };

  return returnedUnit;
}

const mapPropertyToFloorplanList = (floorplanList, floorplanImgList) => {
  let returnedMap = {};

  const floorplanToImgListMap = mapFloorplanToImgList(floorplanImgList);

  for (let i=0; i<floorplanList.length; i++) {
    // Convert data format
    let returnedFloorplan = getReturnedFloorplan(floorplanList[i]);
    returnedFloorplan.images = floorplanToImgListMap[floorplanList[i].id] || []

    // Add floorplan entry according to propertyId 
    if (!returnedMap[floorplanList[i].property_id]) {
      returnedMap[floorplanList[i].property_id] = [returnedFloorplan];
    } else {
      returnedMap[floorplanList[i].property_id].push(returnedFloorplan);
    }
  }

  return returnedMap;
}

const mapPropertyToUnitList = (unitList, unitImgList) => {
  let returnedMap = {};

  const unitToImgListMap = mapUnitToImgList(unitImgList);

  for (let i=0; i<unitList.length; i++) {
    // Convert data format
    let returnedUnit = getReturnedUnit(unitList[i]);
    returnedUnit.images = unitToImgListMap[unitList[i].id] || []

    // Add floorplan entry according to propertyId 
    if (!returnedMap[unitList[i].property_id]) {
      returnedMap[unitList[i].property_id] = [returnedUnit];
    } else {
      returnedMap[unitList[i].property_id].push(returnedUnit);
    }
  }

  return returnedMap;
}

const getReturnedImgLink = imgIpfsAddress => {
  const ipfsHost = 'ipfs.feesimple.io'
  const ipfsProtocol = 'https'
  const imgLink = `${ipfsProtocol}://${ipfsHost}/api/v0/cat?arg=${imgIpfsAddress}`
  return imgLink
}

const mapFloorplanToImgList = (imgList) => {
  let returnedMap = {};

  for (let i=0; i<imgList.length; i++) {
    // Convert data format
    let imgLink = getReturnedImgLink(imgList[i].ipfs_address);

    // Add floorplan entry according to propertyId 
    if (!returnedMap[imgList[i].floorplan_id]) {
      returnedMap[imgList[i].floorplan_id] = [imgLink];
    } else {
      returnedMap[imgList[i].floorplan_id].push(imgLink);
    }
  }

  return returnedMap;
}

const mapUnitToImgList = (imgList) => {
  let returnedMap = {};

  for (let i=0; i<imgList.length; i++) {
    // Convert data format
    let imgLink = getReturnedImgLink(imgList[i].ipfs_address);

    // Add floorplan entry according to propertyId 
    if (!returnedMap[imgList[i].unit_id]) {
      returnedMap[imgList[i].unit_id] = [imgLink];
    } else {
      returnedMap[imgList[i].unit_id].push(imgLink);
    }
  }

  return returnedMap;
}

module.exports = {
  checkAccountNameError,
  mapPropertyToFloorplanList,
  mapPropertyToUnitList,
  mapFloorplanToImgList,
  mapUnitToImgList
};
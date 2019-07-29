const FeeSimple = require('../lib');
const feesimpleClient = FeeSimple();
const {
  mapPropertyToFloorplanList, mapPropertyToUnitList,
  mapFloorplanToImgList, mapUnitToImgList
} = require('../lib/helper');

const testError1 = async () => {
  const what = await feesimpleClient.getWhat('usertrung123', 'abc')
  .catch(err => console.log('error:', err));
}

const testError2 = async () => {
  let what = await feesimpleClient.getWhat('usertrung126', 'property')
  .catch(err => console.log('error:', err));

  what = await feesimpleClient.getWhat('', 'property')
  .catch(err => console.log('error:', err));
}

const testSuccess = async () => {
  const property = await feesimpleClient.getPropertyList('usertrung123');
  console.log('property:', property);

  const propertyImg = await feesimpleClient.getPropertyImgList('usertrung123');
  console.log('propertyImg:', propertyImg);

  const floorplanList = await feesimpleClient.getFloorplanList('usertrung123');
  console.log('floorplanList:', floorplanList);

  const floorplanImg = await feesimpleClient.getFloorplanImgList('usertrung123');
  console.log('floorplanImg:', floorplanImg);

  const unitList = await feesimpleClient.getUnitList('usertrung123');
  console.log('unitList:', unitList);

  const unitImg = await feesimpleClient.getUnitImgList('usertrung123');
  console.log('unitImg:', unitImg);
}

const testMapPropertyToFloorplan = async () => {
  const floorplanList = await feesimpleClient.getFloorplanList('usertrung123');
  console.log('floorplanList:', floorplanList);

  const mapPropToFloorplan = mapPropertyToFloorplanList(floorplanList);
  console.log('mapPropToFloorplan:', mapPropToFloorplan);
}

const testMapPropertyToUnit = async () => {
  const unitList = await feesimpleClient.getUnitList('usertrung123');
  console.log('unitList:', unitList);

  const mapPropToUnit = mapPropertyToUnitList(unitList);
  console.log('mapPropToUnit:', mapPropToUnit);
}

const testMapFloorplanToImgList = async () => {
  const floorplanImgList = await feesimpleClient.getFloorplanImgList('usertrung123');
  console.log('floorplanImgList:', floorplanImgList);

  const mapFlToImgList = mapFloorplanToImgList(floorplanImgList);
  console.log('mapFlToImgList:', mapFlToImgList);
}

const testMapUnitToImgList = async () => {
  const unitImgList = await feesimpleClient.getUnitImgList('usertrung123');
  console.log('unitImgList:', unitImgList);

  const unitToImgList = mapUnitToImgList(unitImgList);
  console.log('unitToImgList:', unitToImgList);
}

const testGetAvailabilityData = async () => {
  const availabilityData = await feesimpleClient.getAvailabilityData('usertrung123');
  console.log('availabilityData:', JSON.stringify(availabilityData, null, 2));
}

(async () => {
  // await testError1();
  // await testError2();
  // await testSuccess();  
  // await testMapPropertyToFloorplan();
  // await testMapPropertyToUnit();

  // await testGetAvailabilityData();

  await testMapFloorplanToImgList();
  await testMapUnitToImgList();
})();
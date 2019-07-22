const FeeSimple = require('../lib');
const feesimpleClient = FeeSimple();
const {mapPropertyToFloorplan} = require('../lib/helper');

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
  const property = await feesimpleClient.getProperty('usertrung123');
  console.log('property:', property);

  const propertyImg = await feesimpleClient.getPropertyImg('usertrung123');
  console.log('propertyImg:', propertyImg);

  const floorplan = await feesimpleClient.getFloorplan('usertrung123');
  console.log('floorplan:', floorplan);

  const floorplanImg = await feesimpleClient.getFloorplanImg('usertrung123');
  console.log('floorplanImg:', floorplanImg);

  const unit = await feesimpleClient.getUnit('usertrung123');
  console.log('unit:', unit);

  const unitImg = await feesimpleClient.getUnitImg('usertrung123');
  console.log('unitImg:', unitImg);
}

const testMapPropertyToFloorplan = async () => {
  const floorplan = await feesimpleClient.getFloorplan('usertrung123');
  console.log('floorplan:', floorplan);

  const mapPropToFloorplan = mapPropertyToFloorplan(floorplan);
  console.log('mapPropToFloorplan:', mapPropToFloorplan);
}

(async () => {
  // await testError1();
  // await testError2();
  // await testSuccess();  
  await testMapPropertyToFloorplan();
})();
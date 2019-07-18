const FeeSimple = require('../lib');
const feesimpleClient = FeeSimple();

(async () => {
  const property = await feesimpleClient.getProperty('usertrung123');
  console.log('property:', property);
})();
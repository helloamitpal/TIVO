const logger = require('./util/logger');
const {
  REDIS_TIVO_ADDONS_SERVICES,
  REDIS_TIVO_CUSTOMER_INFO,
  REDIS_TIVO_PACKAGES,
  REDIS_TIVO_REGIONS
} = require('./constants');

module.exports = (app, redisClient) => {
  const getFilteredData = (list, find) => {
    let arr = [...list];

    if (find) {
      const [attr, searchStr] = find.split(':');
      arr = arr.filter((obj) => {
        let flag = false;

        if (obj.hasOwnProperty(attr)) {
          flag = `${obj[attr]}`.toLowerCase().includes(searchStr.toLowerCase());
        } else {
          const [attr1, attr2] = attr.split('.');
          const val = attr1 && obj[attr1];

          if (val instanceof Object && val.length === undefined) {
            flag = `${val[attr2]}`.toLowerCase().includes(searchStr.toLowerCase());
          } else if (val instanceof Array) {
            flag = val.filter((arrObj) => (arrObj.hasOwnProperty(attr2) && `${arrObj[attr2]}`.toLowerCase().includes(searchStr.toLowerCase())));
          } else {
            throw new Error('Invalid param found');
          }
        }

        return flag;
      });
    }

    return arr;
  };

  // api to get addons services in the store
  app.get('/api/addons', (req, res) => {
    redisClient.get(REDIS_TIVO_ADDONS_SERVICES, (err, obj) => {
      if (err) {
        throw new Error('Something went wrong in fetching addons services');
      }

      const { find } = req.query;
      const data = getFilteredData(JSON.parse(obj).addonServicies, find);

      logger.info(`addons data is found in Redis store: ${data.length}`);
      res.send(data);
    });
  });

  // api to get customer info in the store
  app.get('/api/customerInfo', (req, res) => {
    redisClient.get(REDIS_TIVO_CUSTOMER_INFO, (err, obj) => {
      if (err) {
        throw new Error('Something went wrong in fetching customer info');
      }

      const { find } = req.query;
      const data = getFilteredData(JSON.parse(obj).customerInfo, find);

      logger.info(`customer info is found in Redis store: ${data.length}`);
      res.send(data);
    });
  });

  // api to get normal packages in the store
  app.get('/api/packages', (req, res) => {
    redisClient.get(REDIS_TIVO_PACKAGES, (err, obj) => {
      if (err) {
        throw new Error('Something went wrong in fetching packages');
      }

      const { find } = req.query;
      const data = getFilteredData(JSON.parse(obj).package, find);

      logger.info(`package data is found in Redis store: ${data.length}`);
      res.send(data);
    });
  });

  // api to get regions in the store
  app.get('/api/regions', (req, res) => {
    redisClient.get(REDIS_TIVO_REGIONS, (err, obj) => {
      if (err) {
        throw new Error('Something went wrong in fetching regions');
      }

      const { find } = req.query;
      const data = getFilteredData(JSON.parse(obj).region, find);

      logger.info(`region data is found in Redis store: ${data.length}`);
      res.send(data);
    });
  });

  return app;
};

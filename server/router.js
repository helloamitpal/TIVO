const logger = require('./util/logger');
const {
  REDIS_TIVO_ADDONS_SERVICES,
  REDIS_TIVO_CUSTOMER_INFO,
  REDIS_TIVO_PACKAGES,
  REDIS_TIVO_REGIONS
} = require('./constants');

module.exports = (app, redisClient) => {
  const getFilteredDaa = (list, find) => {
    let arr = JSON.parse(list);

    if (find) {
      const [attr, searchStr] = find.split('=');
      arr = arr.filter((obj) => {
        let flag = false;
        if (obj.hasOwnProperty(attr)) {
          if (!attr.includes('.') && typeof obj[attr] === 'string') {
            flag = obj[attr].toLowerCase().includes(searchStr.toLowerCase());
          } else {
            const [attr1, attr2] = attr.split('.');

            if (obj[attr1] instanceof Object && obj[attr1].length === undefined) {
              flag = obj[attr1][attr2].toLowerCase().includes(searchStr.toLowerCase);
            } else {
              flag = obj[attr].filter((arrObj) => (arrObj.hasOwnProperty(attr2) && [attr2].toLowerCase().includes(searchStr.toLowerCase)));
            }
          }
        }
        return flag;
      });
    }

    return arr;
  };

  // api to get addons services in the store
  app.get('/api/addons', (req, res) => {
    redisClient.get(REDIS_TIVO_ADDONS_SERVICES, (err, arr) => {
      if (err) {
        throw new Error('Something went wrong in fetching addons services');
      }

      const { find } = req.query;
      const data = getFilteredDaa(arr, find);

      logger.info(`addons data is found in Redis store: ${data.length}`);
      res.send(data);
    });
  });

  // api to get customer info in the store
  app.get('/api/customerInfo', (req, res) => {
    redisClient.get(REDIS_TIVO_CUSTOMER_INFO, (err, arr) => {
      if (err) {
        throw new Error('Something went wrong in fetching customer info');
      }

      const { find } = req.query;
      const data = getFilteredDaa(arr, find);

      logger.info(`customer info is found in Redis store: ${data.length}`);
      res.send(data);
    });
  });

  // api to get normal packages in the store
  app.get('/api/packages', (req, res) => {
    redisClient.get(REDIS_TIVO_PACKAGES, (err, arr) => {
      if (err) {
        throw new Error('Something went wrong in fetching packages');
      }

      const { find } = req.query;
      const data = getFilteredDaa(arr, find);

      logger.info(`package data is found in Redis store: ${data.length}`);
      res.send(data);
    });
  });

  // api to get regions in the store
  app.get('/api/regions', (req, res) => {
    redisClient.get(REDIS_TIVO_REGIONS, (err, arr) => {
      if (err) {
        throw new Error('Something went wrong in fetching regions');
      }

      const { find } = req.query;
      const data = getFilteredDaa(arr, find);

      logger.info(`region data is found in Redis store: ${data.length}`);
      res.send(data);
    });
  });

  return app;
};

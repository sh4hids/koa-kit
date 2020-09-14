const { appHost, appPort, apiVersion } = require('../config');

const apiPath = `${appHost}:${appPort}${apiVersion}`;

const generatePaginationQuery = ({ limit = 0, page = 1, count = 0, path }) => {
  return {
    limit,
    offset: limit * (page - 1),
    previous:
      page === 1 ? null : `${apiPath}/${path}/?limit=${limit}&page=${page - 1}`,
    next:
      count > limit * page
        ? `${apiPath}/${path}/?limit=${limit}&page=${page + 1}`
        : null,
  };
};

module.exports = {
  generatePaginationQuery,
};

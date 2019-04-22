const { serverHost, serverPort, api } = require('../config');
const apiPath = `${serverHost}:${serverPort}${api}`;

const generatePaginationQuery = ({ limit, page, count, path }) => {
  console.log(page);
  limit = limit ? parseInt(limit) : 8;
  page = page ? parseInt(page) : 1;

  return {
    limit,
    offset: limit * (page - 1),
    previous:
      page === 1 ? null : `${apiPath}${path}/?limit=${limit}&page=${page - 1}`,
    next:
      count > limit * page
        ? `${apiPath}${path}/?limit=${limit}&page=${page + 1}`
        : null,
  };
};

module.exports = {
  generatePaginationQuery,
};

async function showHomePage(ctx, next) {
  ctx.body = {
    success: true,
    message: 'API v1 home page!',
  };
}

module.exports = {
  showHomePage,
};

require('dotenv').config();
let server = app.listen(process.env.PORT || 5000, function () {
    logger.api.info(`Server listening on port ${server.address().port}`);
    console.log(`Server listening on port ${server.address().port}`);
  });
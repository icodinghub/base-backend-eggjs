'use strict';

module.exports = {
  apiRouter(app) {
    return app.router.namespace('/api');
  },
};

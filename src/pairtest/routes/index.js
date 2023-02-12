const express = require('express');
const purchaseRoute = require('./purchase.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.send('I am OK');
});


/**
 * @swagger
 * tags:
 *   name: Health Check
 *   description: Check if api is working or not
 */

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check if express server is responding to requests
 *     tags: [Health Check]
 *     responses:
 *       "200":
 *         description: I am OK
 */

const defaultRoutes = [
  {
    path: '/purchase',
    route: purchaseRoute,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

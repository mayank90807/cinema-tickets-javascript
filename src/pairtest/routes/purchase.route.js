const express = require('express');
const validate = require('../middlewares/validate');
const purchaseController = require('../controllers/purchase.controller');
const { purchaseValidation } = require("../validations")


const router = express.Router();
router.post('/tickets', validate(purchaseValidation.ticket), purchaseController.purchaseTickets);


/**
 * @swagger
 * tags:
 *   name: Purchase
 *   description: Purchase cinema tickets
 */

/**
 * @swagger
 * /purchase/tickets:
 *   post:
 *     summary: Purchasing cinema tickets for adult, infant and children
 *     tags: [Purchase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/purchase'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/purchaseResponse'
 *       "400":
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/errorResponse'
 */


module.exports = router;

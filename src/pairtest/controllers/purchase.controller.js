const httpStatus = require('http-status');
const catchAsync = require('../lib/catchAsync');
const { TicketService } = require('../services');

const purchaseTickets = catchAsync(async (req, res) => {
  const { accountId = 1, tickets:{ adult = 1, infant = 0, child = 0 } = {}} = req && req.body;
  const ticketService = new TicketService();
  const purchasedTickets = await ticketService.purchaseTickets(accountId, adult, child, infant);
  res.status(httpStatus.CREATED).send(purchasedTickets);
});

module.exports = {
  purchaseTickets,
};

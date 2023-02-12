const httpStatus = require('http-status');
const TicketPaymentService = require('../../thirdparty/paymentgateway/TicketPaymentService');
const SeatReservationService = require('../../thirdparty/seatbooking/SeatReservationService');
const CalculateSeatWithPrice = require('../lib/CalculateSeatWithPrice');
const InvalidPurchaseException = require('../lib/InvalidPurchaseException');
const TicketTypeRequest = require('../lib/TicketTypeRequest');

CalculateSeatWithPrice;
class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  async purchaseTickets(accountId, ...ticketTypeRequests) {
    try{
      const adultTicket = new TicketTypeRequest('ADULT', ticketTypeRequests[0]);
      const childTicket = new TicketTypeRequest('CHILD', ticketTypeRequests[1]);
      const infantTicket = new TicketTypeRequest('INFANT', ticketTypeRequests[2]);
  
      const calculations = new CalculateSeatWithPrice(
        adultTicket.getNoOfTickets(),
        childTicket.getNoOfTickets(),
        infantTicket.getNoOfTickets()
      );
      if(calculations.getTotalPrice() < 1){
        throw new InvalidPurchaseException(httpStatus.BAD_REQUEST, "There is no payment or amount is less than 0")
      }

      const ticketPaymentService = new TicketPaymentService();
      await ticketPaymentService.makePayment(accountId, calculations.getTotalPrice());

      if(calculations.getNumberOfSeats() < 1){
        throw new InvalidPurchaseException(httpStatus.BAD_REQUEST, "There are no seats to reserve")
      }
      const seatReservationService = new SeatReservationService();
      await seatReservationService.reserveSeat(accountId, calculations.getTotalPrice());

      return({
        accountId,
        totalPrice: calculations.getTotalPrice(),
        totalSeatsReserved: calculations.getNumberOfSeats(),
        ticketStructure:{
          [adultTicket.getTicketType()]: adultTicket.getNoOfTickets(),
          [childTicket.getTicketType()]: childTicket.getNoOfTickets(),
          [infantTicket.getTicketType()]: infantTicket.getNoOfTickets(),
        }
      })
    } catch(err){
      console.log(err)
        throw new InvalidPurchaseException(httpStatus.BAD_REQUEST, "Bad Request in Payment or Seats Reservation")
    }
   
  }
}

module.exports = TicketService;

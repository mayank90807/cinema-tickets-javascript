/**
 * Immutable Object.
 */

const httpStatus = require("http-status");
const InvalidPurchaseException = require("./InvalidPurchaseException");

class TicketTypeRequest {
  #type;

  #noOfTickets;

  constructor(type, noOfTickets) {
    if (!this.#Type.includes(type)) {
      throw new InvalidPurchaseException(httpStatus.BAD_REQUEST, `type must be ${this.#Type.slice(0, -1).join(', ')}, or ${this.#Type.slice(-1)}`)
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new InvalidPurchaseException(httpStatus.BAD_REQUEST, "noOfTickets must be an integer")
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }

  #Type = ['ADULT', 'CHILD', 'INFANT'];
}

module.exports = TicketTypeRequest;

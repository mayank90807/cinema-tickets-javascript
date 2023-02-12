/**
 * Immutable Object.
 */


class CalculateSeatWithPrice {
  #adult;
  #child;
  #infant;

  constructor(adult, child, infant) {
    this.#adult = adult;
    this.#child = child;
    this.#infant = infant;
  }

  getTotalPrice() {
    return (
      this.#adult * this.#PriceList['ADULT'] +
      this.#child * this.#PriceList['CHILD'] +
      this.#adult * this.#PriceList['INFANT']
    );
  }

  getNumberOfSeats() {
    return this.#adult + this.#child;
  }

  #PriceList = { ADULT: 20, CHILD: 10, INFANT: 0 };
}

module.exports = CalculateSeatWithPrice;

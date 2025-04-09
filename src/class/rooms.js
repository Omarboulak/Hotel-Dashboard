class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date) {
    if (!(date instanceof Date)) {
      throw new Error('los datos introducidos tienen que ser de tipo Date');
    }
    return this.bookings.some(booking => date >= booking.checkIn && date < booking.checkOut);
  }
}


export default Room;

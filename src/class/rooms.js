class Room {
    constructor(name, bookings, rate, discount) {
      if (typeof name !== 'string') {
        throw new Error('Name must be a string');
      }
      if (!Array.isArray(bookings)) {
        throw new Error('Bookings must be an array');
      }
      if (typeof rate !== 'number') {
        throw new Error('Rate must be a number');
      }
      if (typeof discount !== 'number') {
        throw new Error('Discount must be a number');
      }
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
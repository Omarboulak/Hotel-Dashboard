class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
      if (typeof name !== 'string') {
        throw new Error('El nombre debe ser una cadena de caracteres');
      }
      if (typeof email !== 'string') {
        throw new Error('El email debe ser una cadena de caracteres');
      }
      if (!(checkIn instanceof Date)) {
        throw new Error('El check-in debe ser una instancia de Date');
      }
      if (!(checkOut instanceof Date)) {
        throw new Error('El check-out debe ser una instancia de Date');
      }
      if (typeof discount !== 'number') {
        throw new Error('El descuento debe ser un número');
      }
      if (!room || typeof room !== 'object') {
        throw new Error('La reserva debe tener un room válido');
      }
      this.name = name;
      this.email = email;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.discount = discount;
      this.room = room;
    }
}
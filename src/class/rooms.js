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

  occupancyPercentage(startDate, endDate) {
    if (startDate > endDate) return 0;

    const days = 24 * 60 * 60 * 1000;
    const totalDays = Math.round((endDate - startDate) / days) + 1;

    let occupiedDays = 0;

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate.getTime() + i * days);
      if (this.isOccupied(currentDate)) {
        occupiedDays++;
      }
    }

    const percentage = (occupiedDays / totalDays) * 100;
    return Number(percentage.toFixed(2));
  }


  static totalOccupancyPercentage(rooms, startDate, endDate) {
    if (!Array.isArray(rooms)) return 0;
    let totalPercentage = 0;

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      const roomPercentage = room.occupancyPercentage(startDate, endDate);
      totalPercentage += roomPercentage;
    }
    return Number((totalPercentage / rooms.length).toFixed(2));
  }

  static availableRooms(rooms, startDate, endDate) {
    const filterRoom = rooms.filter(room => {
      while (startDate <= endDate) {
        if (room.isOccupied(new Date(startDate))) {
          return false;
        }
        startDate.setDate(startDate.getDate() + 1);
      }
    });
    
    return filterRoom;
  }
}

export default Room;

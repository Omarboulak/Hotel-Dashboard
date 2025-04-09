import Room from "../src/class/rooms";
import Booking from "../src/class/booking";

const booking = [
  new Booking(
    'Omar',
    'omarboulakchour@gmail.com',
    new Date(2025, 11, 12),
    new Date(2025, 11, 15),
    10,
    null
  ),
  new Booking(
    'pepe',
    'pepe@gmail.com',
    new Date(2025, 11, 20),
    new Date(2025, 11, 22),
    5,
    null
  )
];

describe('propiedades de la clase de Rooms', () => {
  it('El nombre introducido es un string', () => {
    const room = new Room('double', booking, 100, 10);
    expect(typeof room.name).toBe('string');
  });

  it('Los Booking tienen que ser un array', () => {
    const room = new Room('double', booking, 100, 10);
    expect(Array.isArray(room.bookings)).toBe(true);
  });
  
  it('El rate tiene que ser un numero', () => {
    const room = new Room('double', [booking[0]], 100, 10);
    expect(typeof room.rate).toBe('number');
  });
  
  it('El rate tiene que ser mayor o igual a 0', () => {
    const room = new Room('double', booking[0], 100, 10);
    expect(room.rate).toBeGreaterThanOrEqual(0);
  });

  it('El discount tiene que ser un numero entre 0 y 100', () => {
    const room = new Room('double', booking[0], 100, 10);
    expect(room.discount).toBeGreaterThanOrEqual(0);
  });

  it('El discount tiene que ser un numero entre 0 y 100', () => {
    const room = new Room('double', booking[0], 100, 10);
    expect(room.discount).toBeLessThanOrEqual(100);
  });

  it('El método isOccupied tiene que devolver un booleano', () => {
    const room = new Room('double', [booking[0]], 100, 10);
    expect(typeof room.isOccupied(new Date(2025, 11, 12))).toBe('boolean');
  });

  it('El método occupancyPercentage tiene que devolver un numero', () => {
    const room = new Room('double', [booking[0]], 100, 10);
    expect(typeof room.occupancyPercentage(new Date(2025, 11, 12), new Date(2025, 11, 15))).toBe('number');
  });

  it('El método totalOccupancyPercentage tiene que devolver un numero', () => {
    const room = new Room('double', [booking[0]], 100, 10);
    expect(Room.totalOccupancyPercentage([room], new Date(2025, 11, 12), new Date(2025, 11, 15)))
      .toBeGreaterThanOrEqual(0);
  });

  it('El método availableRooms tiene que devolver un array', () => {
    const room = new Room('double',[booking[0]], 100, 10);
    expect(Array.isArray(Room.availableRooms([room], new Date(2025, 11, 12), new Date(2025, 11, 15))))
      .toBe(true);
  });
});

describe('propiedades de la clase de Booking', () => {
  it('El nombre introducido en booking tiene que ser un string', () => {
    expect(typeof booking[0].name).toBe('string');
  });

  it('El email introducido en booking tiene que ser un string', () => {
    expect(typeof booking[0].email).toBe('string');
  });

  it('El checkIn introducido tiene que ser un Date', () => {
    expect(booking[0].checkIn instanceof Date).toBe(true);
  });

  it('El checkOut introducido tiene que ser un Date', () => {
    expect(booking[0].checkOut instanceof Date).toBe(true);
  });

  it('El discount de booking introducido tiene que ser un número', () => {
    expect(typeof booking[0].discount).toBe('number');
  });
});

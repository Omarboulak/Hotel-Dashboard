describe('propiedades de la clase de Rooms', () =>{
    it('El nombre introducido es un string', () =>{
        const bookings = new Bookings();
        const room = new Room('double', bookings, 100, 10);
        expect(typeof room.name).toBe('string')
    })

    it('Los bookings tiene que ser un array', () => {
        const bookings = new Bookings();
        const room = new Room('double', bookings, 100, 10);
        expect(Array.isArray(room.bookings)).toBe(true);
    })

    it('El rate tiene que ser un numero', () => {
        const bookings = new Bookings();
        const room = new Room('double', bookings, 100, 10);
        expect(typeof room.rate).toBe('number');
        expect(room.rate).toBeGreaterThanOrEqual(0);
    })

    it('El discount tiene que ser un nuemero del 0 al 100', () => {
        const bookings = new Bookings();
        const room = new Room('double', bookings, 100, 10);
        expect(room.discount).toBeGreaterThanOrEqual(0);
        expect(room.discount).toBeLessThanOrEqual(100);
    })

    it('el metodo isOccupied tiene que ser booleano', () => {
        const bookings = new Bookings();
        const room = new Room('double', bookings, 100, 10);
        expect(typeof room.isOccupied('12/12/2025')).toBe('boolean');
    })

    it('el metodo occupancyPercentage tiene que devolver un numero', () => {
        const bookings = new Bookings();
        const room = new Room('double', bookings, 100, 10);
        expect(typeof room.occupancyPercentage('12/12/2025', '12/15/2025')).toBe('number');
    })

    it('el metodo totalOccupancyPercentage tiene que devolver un numero', () => {
        const bookings = new Bookings();
        const room = new Room('double', bookings, 100, 10);
        expect(room.totalOccupancyPercentage('double', '12/12/2025', '12/15/2025')).toBeGreaterThanOrEqual(0);
    })

    it('el metodo availableRooms tiene que devolver un numero', () => {
        const bookings = new Bookings();
        const room = new Room('double', bookings, 100, 10);
        expect(Array.isArray(room.availableRooms('double', '12/12/2025', '12/15/2025'))).toBe('array');
    })
})


describe('propiedades de la clase de Bookings', () =>{
    it('El nombre introducido de booking tiene que ser un string', () =>{
        const room = new Room('double', bookings, 100, 10);
        const bookings = new Bookings('Omar', 'omarboulakchour@gmail.com', '12/12/2025', '12/15/2025', 10);
        expect(typeof bookings.name).toBe('string')
    })

    it('El empail introducido de booking tiene que ser un string', () =>{
        const room = new Room('double', bookings, 100, 10);
        const bookings = new Bookings('Omar', 'omarboulakchour@gmail.com', '12/12/2025', '12/15/2025', 10);
        expect(typeof bookings.email).toBe('string')
    })

    it('El checkIn introducido tiene que ser un date', () =>{
        const room = new Room('double', bookings, 100, 10);
        const bookings = new Bookings('Omar', 'omarboulakchour@gmail.com', '12/12/2025', '12/15/2025', 10);
        expect(bookings.checkIn instanceof Date).toBe(true)
    })
    
    it('El checkOut introducido tiene que ser un date', () =>{
        const room = new Room('double', bookings, 100, 10);
        const bookings = new Bookings('Omar', 'omarboulakchour@gmail.com', '12/12/2025', '12/15/2025', 10);
        expect(bookings.checkOut instanceof Date).toBe(true)
    })

    it('El discount de bookings introducido tiene que ser un numero', () =>{
        const room = new Room('double', bookings, 100, 10);
        const bookings = new Bookings('Omar', 'omarboulakchour@gmail.com', '12/12/2025', '12/15/2025', 10);
        expect(typeof bookings.discount).toBe('number')
    })


})

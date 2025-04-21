export const dummyBookingData = [
  {
    id: 1,
    parkingName: "Central City Parking",
    parkingAddress: "123 Main St, Downtown",
    startTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    endTime: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    vehicle: "My Car (ABC-1234)",
    price: 16,
    status: "confirmed",
    paymentMethod: "Visa •••• 4242"
  },
  {
    id: 2,
    parkingName: "Harbor View Garage",
    parkingAddress: "456 Ocean Ave, Bayfront",
    startTime: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    endTime: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(), // 2 days ago + 3 hours
    vehicle: "My Car (ABC-1234)",
    price: 30,
    status: "completed",
    paymentMethod: "MasterCard •••• 8765"
  },
  {
    id: 3,
    parkingName: "Metro Park & Ride",
    parkingAddress: "789 Transit Blvd, Midtown",
    startTime: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    endTime: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(), // 5 days ago + 8 hours
    vehicle: "My Car (ABC-1234)",
    price: 40,
    status: "completed",
    paymentMethod: "Visa •••• 4242"
  },
  {
    id: 4,
    parkingName: "Luxury Plaza Parking",
    parkingAddress: "321 Uptown St, Financial District",
    startTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days in future
    endTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 3 days in future + 2 hours
    vehicle: "My Car (ABC-1234)",
    price: 30,
    status: "upcoming",
    paymentMethod: "Visa •••• 4242"
  }
];
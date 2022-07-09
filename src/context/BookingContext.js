import { createContext } from "react";

const BookingContext = createContext({
    bookings: [],
    fetchData: (status) => {}

})

export default BookingContext
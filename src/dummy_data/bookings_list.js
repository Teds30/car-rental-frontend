// import { v4 as uuidv4 } from 'uuid'

const booking_list = [
    {
        id: 1,
        car: {
            _id: 1233234,
            brand: 'Subaru',
            model: 'Outback'
        },
        customer: {
            _id: 5673454,
            first_name: 'Mikee',
            last_name: 'Enaje'
        },
        booking_date: {
            from_date: '07/30/2002',
            to_date: '07/30/2002',
        },

        status: 'pending',
        total_amount: 3400,
    },
]

export default booking_list

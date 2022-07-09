import React from 'react'

import CarsList from '../../../components/cars/CarsList'

const Cars = () => {
    
    return (
        <div className="container">
            <main className="main">
                <h1>Cars</h1>
                <ul className="grid">
                    <CarsList />
                </ul>
            </main>
        </div>
    )
}

export default Cars

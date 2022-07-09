import React, { useEffect, useState } from 'react'

import useHttp from '../../hooks/http-hook'

import Car from './Car'

import LoadingSpinner from '../UIElements/LoadingSpinner'

const CarsList = (props) => {
    const { sendRequest, isLoading } = useHttp()
    const [loadedCars, setLoadedCars] = useState()

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await sendRequest({
                    url: 'http://localhost:4000/api/cars',
                })

                setLoadedCars(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchCars()
    }, [setLoadedCars, sendRequest])

    let cars

    cars = loadedCars
        ? loadedCars.map((car) => {
              return (
                  <li key={car._id} className="nonlist">
                      <Car car={car} />
                  </li>
              )
          })
        : undefined

    let content

    if (isLoading) {
        return <LoadingSpinner center color="primary" />
    }

    if (!isLoading && !loadedCars) {
        return <p style={{ textAlign: 'center' }}>No Data.</p>
    }

    if (!isLoading && loadedCars) {
        content = cars
    }

    return <React.Fragment>{content}</React.Fragment>
}

export default CarsList

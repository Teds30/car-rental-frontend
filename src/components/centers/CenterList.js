import React, { useEffect, useState } from 'react'

import useHttp from '../../hooks/http-hook'

import Center from './Center'

import LoadingSpinner from '../UIElements/LoadingSpinner'

const CenterList = (props) => {
    const { sendRequest, isLoading } = useHttp()
    const [loadedCenters, setLoadedCenters] = useState()

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const data = await sendRequest({
                    url: 'http://localhost:4000/api/centers',
                })

                setLoadedCenters(data)
            } catch (err) {
                throw err
            }
        }

        fetchCenters()
    }, [setLoadedCenters, sendRequest])

    let centers

    centers = loadedCenters
        ? loadedCenters.map((center) => {
              return (
                  <li key={center._id} className="nonlist">
                      <Center center={center} />
                  </li>
              )
          })
        : undefined

    if (isLoading) {
        return <LoadingSpinner center color="primary" />
    }
    return (
        <React.Fragment>
            {centers || <p style={{ textAlign: 'center' }}>No data.</p>}
        </React.Fragment>
    )
}

export default CenterList

import React, { Fragment, useCallback, useEffect, useState } from 'react'

import useCarManager from '../../hooks/cars-hook'
import useNotistack from '../../hooks/notistack-hook'

import Table from '../UIElements/Table/Table'

import LoadingSpinner from '../UIElements/LoadingSpinner'

const ManageCarsList = (props) => {
    const { type } = props

    const { isLoading, fetchCars, fetchCarsByType } = useCarManager()
    const { notify, notifyWithCollapse } = useNotistack()

    const [loadedData, setLoadedData] = useState([])

    const fetchData = useCallback(
        async (type = 'all') => {
            let data
            try {
                if (type === 'all') {
                    data = await fetchCars()
                    setLoadedData(data)
                    return
                }

                data = await fetchCarsByType(type)
                // console.log(data)
                setLoadedData(data)
            } catch (err) {
                notify('Failed to fetch data. ', 'error')
            }
        },
        [fetchCars, notify, fetchCarsByType]
    )

    useEffect(() => {
        fetchData(type)
    }, [fetchData, notify, type, notifyWithCollapse])

    const carDeletedHandler = (deletedCarId) => {
        setLoadedData((prevCars) =>
            prevCars.filter((car) => car._id !== deletedCarId)
        )
    }

    const headersContent = (
        <tr>
            <th>name</th>
            <th>rate</th>
            <th>type</th>
            <th>seats</th>
            <th>transmission</th>
            <th>status</th>
        </tr>
    )

    return (
        <Fragment>
            {isLoading && <LoadingSpinner center />}
            {!isLoading && loadedData.length > 0 && (
                <Table
                    headers={headersContent}
                    initialData={loadedData}
                    onDeleteData={carDeletedHandler}
                    onRefetchData={fetchData}
                    selectedCarType={type}
                />
            )}
        </Fragment>
    )
}

export default ManageCarsList

import { useState, useEffect } from 'react'

const useSearch = (initialData) => {
    //eslint-disable-next-line
    const [data, setUpdatedData] = useState([])

    useEffect(() => {
        setUpdatedData(initialData)
    }, [initialData])

    const searchData = (searchInput) => {
        const newList = initialData.filter((car) =>
            car.brand.toLowerCase().includes(searchInput)
        )
        setUpdatedData(newList)
    }

    return {
        searchData,
        data,
    }
}

export default useSearch

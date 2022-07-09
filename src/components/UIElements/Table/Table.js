import React, { useState } from 'react'

import useSearch from '../../../hooks/input_hooks/search-hook'

import SearchField from '../Input/Search/SearchField'
import styles from './Table.module.css'
// eslint-disable-next-line
import CollapsibleRow from '../../manage_cars/CollapsibleRow'

import TablePagination from '@mui/material/TablePagination'

import PaginationActions from './PaginationActions'

const Table = (props) => {
    // const {data, headers} = props

    const { headers, initialData } = props
    const { onDeleteData, onRefetchData, selectedCarType } = props // pass to collapsiblerow

    const { data, searchData } = useSearch(initialData)

    // FOR PAGINATION
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

    // eslint-disable-next-line
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    // eslint-disable-next-line
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }


    let body = emptyRows > 0 && (
        <tr style={{ height: 53 * emptyRows }}>
            <td colSpan={6} />
        </tr>
    )

    body = (
        rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
    ).map((row) => (
        <CollapsibleRow
            key={row._id}
            row={row}
            onDeleteData={onDeleteData}
            onRefetchData={onRefetchData}
            selectedCarType={selectedCarType}
        />
    ))

    return (
        <div className={styles.table}>
            <div className={styles['table__action']}>
                <SearchField
                    placeholder="Seach by brand"
                    searchData={searchData}
                />
            </div>
            <table>
                <thead>{headers}</thead>
                <tbody>
                    {body}
                    {/* {rows} */}
                </tbody>
                <tfoot>
                    <tr>
                        <TablePagination
                            colSpan={6}
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: 'All', value: -1 },
                            ]}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={PaginationActions}
                        />
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Table

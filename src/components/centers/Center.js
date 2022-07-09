import React, { useState, Fragment } from 'react'
import Map from '../UIElements/Map'

import Modal from '../UIElements/Modal'
import LinkCard from '../UIElements/LinkCard'
import { FaStore } from 'react-icons/fa'

const Center = (props) => {
    const { center } = props

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    const handleToggle = () => {
        setOpen(!open)
    }

    const modal = (
        <Modal
            open={open}
            onClose={handleClose}
            title={center.name}
            caption={center.address}
        >
            <Map center={center.location} zoom={13} name={center.name} />
        </Modal>
    )
    return (
        <Fragment>
            {open && modal}
            <div className="grid">
                <LinkCard
                    onClick={handleToggle}
                    title={center.name}
                    content={center.address}
                    btnTitle="Show in Map"
                    icon={<FaStore />}
                ></LinkCard>
            </div>
        </Fragment>
    )
}

export default Center

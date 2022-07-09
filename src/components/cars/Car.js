import React, { Fragment } from 'react'

import Card from '../UIElements/Card'

const Center = (props) => {
    return (
        <Fragment>
            <Card hasHover={true} hasBorder={true}>
                <h6>{props.car.brand}</h6>
                <p>{props.car.model}</p>
            </Card>
        </Fragment>
    )
}

export default Center

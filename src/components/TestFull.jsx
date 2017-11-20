import React from 'react'
import PropTypes from 'prop-types'

export default class TestFull extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired
    }

    render() {
        const {advert_name, created_at, description,price} = this.props.item
        return (
            <div>
                <div>Advert name: {advert_name}</div>
                <div>Created at: {created_at}</div>
                <div>Desctiption: {description}</div>
                <div>Price: {price}</div>
            </div>
        )
    }
}
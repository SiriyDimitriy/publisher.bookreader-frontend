import React from 'react'
import {Link} from 'react-isomorphic-tools'
import PropTypes from 'prop-types'

export default class Test extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired
    }
    render() {
        const {items} = this.props
        return (
            <ul>
                {items.map((item, index)=>(
                    <Link key={index} to={{pathname: `/test/${item.id}`}}>
                        <li>
                            {item.advert_name}
                        </li>
                    </Link>
                ))}
            </ul>
        )
    }
}
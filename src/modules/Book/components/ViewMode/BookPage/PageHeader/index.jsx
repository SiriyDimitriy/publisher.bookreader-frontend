import React from 'react'
import PageElementWrapper from '../../../common/PageElementWrapper'

const Wrapper = PageElementWrapper.extend`
    align-items: center;
    padding-left: 0rem;
    margin: 0;
    border: none;
`

export default class PageHeader extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {header} = this.props
        return (
            header.header ? (<Wrapper>
                {header.header}
            </Wrapper>) : null
        )
    }
}
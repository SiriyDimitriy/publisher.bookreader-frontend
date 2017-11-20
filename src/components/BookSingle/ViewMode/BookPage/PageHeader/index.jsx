import React from 'react'
import PageElementWrapper from '../../../../common/PageElementWrapper'

const Wrapper = PageElementWrapper.extend`
    align-items: center;
`

export default class PageHeader extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {header} = this.props
        return (
            <Wrapper>
                {header}
            </Wrapper>
        )
    }
}
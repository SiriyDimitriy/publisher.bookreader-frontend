import React from 'react'
import PageElementWrapper from '../../../../../components/common/PageElementWrapper'

const Section = PageElementWrapper.extend`
    padding: 1.6rem 2.5rem 1.2rem 1.6rem;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.39;
    article {
        width: 1.9rem;
        height: 1.3rem;
        svg { 
            max-height: 100%; 
        }
    }
`

export default class Paragraph extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {paragraph} = this.props
        return (
            <Section>
                {paragraph}
            </Section>
        )
    }
}
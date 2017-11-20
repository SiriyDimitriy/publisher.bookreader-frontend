import React from 'react'
import PageElementWrapper from '../../../common/PageElementWrapper'

const Section = PageElementWrapper.extend`
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.39;
    border: none;
    padding-left: 0;
`

export default class Paragraph extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {paragraph} = this.props
        return (
            paragraph.paragraph ? <Section>
                {paragraph.paragraph}
            </Section> : null
        )
    }
}
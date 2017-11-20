import React from 'react'
import styled from 'styled-components'
import Separator from '../../../../assets/images/svg/page-separator.svg'

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 2.3rem 0;
`

export default class PageDivider extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Section>
                <Separator/>
            </Section>
        )
    }
}
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
    display: flex;
    margin-top: 2rem;
`

export default class ClipboardContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    render() {
        return (
            <Wrapper>
                content
            </Wrapper>
        )
    }
}
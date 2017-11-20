import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.span`
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0px;
    text-align: left;
    color: #000000;
    opacity: 0.3;
`

export default class ObjectTitle extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {type} = this.props
        let elem
        switch (type) {
            case 'header':
                elem = 'Title'
                break;
            case 'media':
                elem = 'Multimedia block'
                break;
            case 'question':
                elem = 'Question block'
                break;
            case 'paragraph':
                elem = 'Text block'
                break;
            case 'page':
                elem = 'Page separator'
                break;
        }
        return (
            <Wrapper>
                {elem}
            </Wrapper>
        )
    }
}
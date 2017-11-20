import React from 'react'
import styled from 'styled-components'
import Header from '../../../assets/images/svg/book-header.svg'
import Paragraph from '../../../assets/images/svg/page-paragraph.svg'
import Separator from '../../../assets/images/svg/two-pages.svg'
import Media from '../../../assets/images/svg/page-media.svg'
import Question from '../../../assets/images/svg/question.svg'

const Wrapper = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    margin-right: 1.2rem;
    border-radius: 1rem;
    background-color: #4a4a4a;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.15);
    svg {
        width: 18px;
        path {
            fill: #ffffff;
        }
    }
`

export default class Object extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {type} = this.props
        let elem
        switch (type) {
            case 'header':
                elem = <Header/>
                break;
            case 'media':
                elem = <Media/>
                break;
            case 'question':
                elem = <Question/>
                break;
            case 'paragraph':
                elem = <Paragraph/>
                break;
            case 'page':
                elem = <Separator/>
                break;
        }
        return (
            <Wrapper>
                {elem}
            </Wrapper>
        )
    }
}
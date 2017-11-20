import React from 'react'
import styled from 'styled-components'
import ClipboardContent from './ClipboardContent/index'
import ClipboardIcon from '../../../assets/images/svg/clipboard-icon.svg'

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    height: 38rem;
    width: 22rem;
    padding: 2rem;
    margin-top: 10rem;
    position: fixed;
    right: 0;
    border-radius: 1rem;
    background-color: #e7e7e7;
    border: dashed 3px #a5a5a5;
`

const ClipboardHeader = styled.header`
    display: flex;
    align-items: center;
    svg {
        width: 2rem;
        height: 2rem;
        margin-right: 1.5rem;
        path {
            opacity: 0.5;
            background-color: #000000;
        }
    }
    span {
        opacity: 0.7;
        font-size: 1.6rem;
        font-weight: 500;
        color: rgb(74, 74, 74);
    }
`

export default class Clipboard extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
    }

    render() {
        return (
            <Wrapper>
                <ClipboardHeader>
                    <ClipboardIcon/>
                    <span>Clipboard</span>
                </ClipboardHeader>
                <ClipboardContent/>
            </Wrapper>
        )
    }
}
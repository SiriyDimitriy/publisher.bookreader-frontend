import React from 'react'
import styled from 'styled-components'
import Object from './Object'
import DnD from '../DnD/index'
import ObjectTitle from './ObjectTitle'
import Move from '../../../../../../assets/images/svg/move-option.svg'

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    position: fixed;
    margin-top: 10rem;
    left: 3rem;
    align-self: center;
    &> * {
        margin-top: 1.5rem;
    }
    &> div {
        display: flex;
        align-items: center;
    }
`

const ClipboardControlsHeader = styled.section`
    display: flex;
    align-items: center;
    height: 3rem;
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
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0px;
        text-align: left;
        color: #000000;
        opacity: 0.5;
    }
`

export default class DrugNewElementsSection extends React.Component {
    constructor() {
        super();
    }

    render() {
        const newElements = ['header', 'media', 'paragraph', 'question', 'page']

        return (
            <Wrapper>
                <ClipboardControlsHeader>
                    <Move/>
                    <span>Drug action into the page</span>
                </ClipboardControlsHeader>
                {newElements.map((el, index) => {
                    return (<DnD
                        key={index}
                        id={'new-' + el}
                        newMarkerElemType = {'new-' + el}
                        createNewPageElement={this.props.createNewPageElement}
                    >
                        <Object type={el}/>
                        <ObjectTitle type={el}/>
                    </DnD>)
                })}
            </Wrapper>
        )
    }
}
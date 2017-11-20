import React from 'react'
import styled from 'styled-components'
import QuestionIcon from '../../../../../assets/images/svg/question.svg'

const Section = styled.section`
    display: flex;
    padding: 1.1rem 2rem 1.4rem 2rem;
    margin-bottom: 2rem;
    border-radius: 0.7rem;
    background-color: rgba(255, 113, 0, 0.3);
`

const DialogBody = styled.section`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
`

const Question = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.4rem;
`

const Answer = styled.section`
    display: flex;
    flex-direction: column;
`

const Title = styled.section`
    height: 1.8rem;
    font-family: Qanelas;
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: -0px;
    text-align: left;
    color: rgba(0, 0, 0, 0.54);
`
const Body = styled.section`
    font-family: Qanelas;
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: -0px;
    text-align: left;
    color: #000000;
`

const Separator = styled.div`
    width: 32rem;
    height: 0px;
    object-fit: contain;
    opacity: 0.1;
    border: solid 0.1rem #000000;
`

export default class Dialog extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Section>
                <QuestionIcon/>
                <DialogBody>
                    <Question>
                        <Title>Your question</Title>
                        <Body>What?</Body>
                        <Separator/>
                    </Question>
                    <Answer>
                        <Title>Correct answer</Title>
                        <Body>Nothing</Body>
                        <Separator/>
                    </Answer>
                </DialogBody>
            </Section>
        )
    }
}
import React from 'react'
import styled from 'styled-components'
import NoImageIcon from '../../../../../../assets/images/svg/picture.svg'

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
`

const NoImage = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    box-shadow: 0 0.5rem 2rem 0 rgba(0, 0, 0, 0.09);
    svg {
        height: 12px;
    }
`

const ImageWrapper = styled.section`
    align-self: center;
    height: 10rem;
    width: 100%;
    margin-bottom: 1rem;
    background-color: #ffffff;
    box-shadow: 0 0.5rem 2rem 0 rgba(0, 0, 0, 0.09);
    border-radius: 1rem;
`

const BookImg = styled.img`
    height: 10rem;
    object-fit: contain;
    border-radius: 1rem;
`

const BookName = styled.section`
    font-size: 2rem;
    font-weight: bold;
    color: #4a4a4a;
`

const BookAuthor = BookName.extend`
    font-size: 1rem;
    font-weight: 600;
    color: #9b9b9b;
`

export default class BookHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {author, title, avatar} = this.props.book
        return (
            <Section>
                <ImageWrapper>
                    {avatar ? (<BookImg src={avatar.path}/>
                    ) : (<NoImage><NoImageIcon/></NoImage>)}
                </ImageWrapper>
                <BookName>
                    {title}
                </BookName>
                <BookAuthor>
                    {author}
                </BookAuthor>
            </Section>
        )
    }
}
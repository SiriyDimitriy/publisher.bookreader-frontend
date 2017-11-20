import React from 'react'
import styled from 'styled-components'
import BookNameIcon from '../../../../assets/images/svg/book-header.svg'
import AuthorNameIcon from '../../../../assets/images/svg/person.svg'
import EditText from '../../common/EditText/index'
import * as ReactDOM from 'react-dom'
import RemoveMediaIcon from '../../../../assets/images/svg/cancel.svg'
import Page from '../../common/Page'
import RemoveMedia from '../../common/RemoveMedia'
import HeaderCropImageUpload from './HeaderCropImageUpload/index'

const ImageWrapper = styled.section`
    align-self: center;
    height: 15rem;
    margin-bottom: 4.4rem;
    background-color: #ffffff;
    box-shadow: 0 0.5rem 2rem 0 rgba(0, 0, 0, 0.09);
    border-radius: 1rem;
`

const BookImg = styled.img`
    height: 15rem;
    object-fit: contain;
    border-radius: 1rem;
`

const BookName = styled.section`
    display: flex;
    align-items: flex-end;
    padding-left: 2rem;
    margin-bottom: 1.4rem;
    font-family: Qanelas;
    font-size: 3.1rem;
    font-weight: 900;
    line-height: 1.13;
    letter-spacing: -0.1px;
    text-align: left;
    color: #4a4a4a;
`

const BookAuthor = BookName.extend`
    align-items: center;
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: -0px;
    color: #9b9b9b;
`

const Content = styled.section`
    margin-left: 2rem;
    flex: 1;
`

const BookNameContent = Content.extend`
    border-bottom: solid 0.2rem #dddddd;
`

const UploadHeader = styled.section`
    width: 15rem;
    display: flex;
    height: 100%;
    padding: 1rem;
    align-items: center;
    border-radius: 1rem;
    justify-content: center;
    background-color: #f0f0f0;
`

const MediaWrapper = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
        object-fit: cover;
    }
    &:hover section {
        display: flex;
    }
`

export default class BookHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookNameHeight: null,
            bookAuthorNameHeight: null,
        }
    }

    removeMedia = () => {
        this.props.removeHeaderMedia()
    }

    componentDidMount() {
        let bookNameHeight = getComputedStyle(ReactDOM.findDOMNode(this.bookName)).height
        let bookAuthorNameHeight = getComputedStyle(ReactDOM.findDOMNode(this.bookAuthorName)).height
        this.setState({
            bookNameHeight,
            bookAuthorNameHeight
        })
    }

    bookTitleChangeHandler = (val) => {
        this.props.changeBookTitle(this.props.bookId, val)
    }

    bookAuthorChangeHandler = (val) => {
        this.props.changeBookAuthor(this.props.bookId, val)
    }

    render() {
        const {bookId, bookAuthor, bookName, avatar} = this.props
        return (
            <Page>
                <ImageWrapper>
                    {this.props.avatar ? (<MediaWrapper>
                        <BookImg src={avatar.path}/>
                        <RemoveMedia title='remove media' onClick={this.removeMedia}><RemoveMediaIcon/></RemoveMedia>
                    </MediaWrapper>) : (<UploadHeader><HeaderCropImageUpload
                        bookId={this.props.bookId}
                        selectHeaderMedia={this.props.selectHeaderMedia}
                    /></UploadHeader>)}
                </ImageWrapper>
                <BookName>
                    <BookNameIcon/>
                    <BookNameContent ref={(content) => this.bookName = content}>
                        <EditText
                            bookId={bookId}
                            content={bookName}
                            height={this.state.bookNameHeight}
                            handler={this.bookTitleChangeHandler}
                        />
                    </BookNameContent>
                </BookName>
                <BookAuthor>
                    <AuthorNameIcon/>
                    <Content ref={(content) => this.bookAuthorName = content}>
                        <EditText
                            bookId={bookId}
                            content={bookAuthor}
                            height={this.state.bookAuthorNameHeight}
                            handler={this.bookAuthorChangeHandler}/>
                    </Content>
                </BookAuthor>
            </Page>
        )
    }
}
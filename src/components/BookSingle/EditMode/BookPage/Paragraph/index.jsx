import React from 'react'
import styled from 'styled-components'
import ParagraphIcon from '../../../../../../assets/images/svg/page-paragraph.svg'
import EditText from '../../../../common/EditText/index'
import * as ReactDOM from 'react-dom'
import PageElementWrapper from '../../../../../components/common/PageElementWrapper'

const Section = PageElementWrapper.extend`
    padding: 1.6rem 2.5rem 1.2rem 1.6rem;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.39;
    article {
        width: 1.9rem;
        height: 1.3rem;
        svg { 
            max-height: 100%; 
        }
    }
`
const Content = styled.span`
    padding-left: 1rem;
    flex: 1;
`

export default class Paragraph extends React.Component {
    constructor() {
        super();
        this.state = {
            paragraphHeight: null,
        }
    }

    paragraphChangeHandler = (val) => {
        this.props.changePageParagraph(this.props.bookId, this.props.pageNumber, this.props.paragraph.id, val)
    }

    componentDidMount() {
        let paragraphHeight = getComputedStyle(ReactDOM.findDOMNode(this.paragraph)).height
        this.setState({
            paragraphHeight,
        })
    }

    render() {
        const {paragraph, bookId, pageNumber} = this.props
        return (
            <Section>
                <article><ParagraphIcon/></article>
                <Content ref={(content) => this.paragraph = content}>
                    <EditText
                        bookId={bookId}
                        content={paragraph.paragraph}
                        pageNumber={pageNumber}
                        height={this.state.paragraphHeight}
                        handler={this.paragraphChangeHandler}
                    />
                </Content>
            </Section>
        )
    }
}
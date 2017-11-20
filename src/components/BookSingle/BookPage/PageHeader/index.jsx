import React from 'react'
import styled from 'styled-components'
import PageHeaderIcon from '../../../../../assets/images/svg/page-header.svg'
import EditText from '../../../common/EditText/index'
import * as ReactDOM from 'react-dom'
import PageElementWrapper from '../../../common/PageElementWrapper'

const Wrapper = PageElementWrapper.extend`
    align-items: center;
`

const Header = styled.header`
    padding-left: 1rem;
    flex: 1;
`

export default class PageHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            pageHeaderHeight: null,
        }
    }

    pageHeaderChangeHandler = (val) => {
        this.props.changePageHeader(this.props.bookId, this.props.pageNumber, this.props.header.id, val)
    }

    componentDidMount() {
        let pageHeaderHeight = getComputedStyle(ReactDOM.findDOMNode(this.pageHeader)).height
        this.setState({
            pageHeaderHeight,
        })
    }

    render() {
        const {header, pageNumber} = this.props
        return (
            <Wrapper>
                <PageHeaderIcon/>
                <Header ref={(content) => this.pageHeader = content}>
                    <EditText
                        bookId={null}
                        content={header.header}
                        pageNumber={pageNumber}
                        height={this.state.pageHeaderHeight}
                        handler={this.pageHeaderChangeHandler}
                    />
                </Header>
            </Wrapper>
        )
    }
}
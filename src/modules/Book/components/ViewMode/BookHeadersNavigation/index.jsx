import React from 'react';
import styled from 'styled-components';
import {NavLink as Link} from 'react-isomorphic-tools'
import BookHeader from '../BookHeader/index'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  top: 13.3rem;
  left: 0;
  width: 25rem;
  margin-left: 4rem;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    height: 4.5rem;
    font-size: 14px;
    font-weight: 600;
    color: #C7C7C7;
    border-bottom: 0.1rem solid #F5F5F5;
  }
  .navigation__link--active {
    color: #4a4a4a;
    border-bottom: 0.1rem solid #D2D2D2;
  }
`;

const HeaderName = styled.section`
  margin-left: 2rem;
`

const Headers = styled.section`
    max-height: 27rem;
    overflow-y: auto;
`

export default class BookHeadersNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Section>
                <BookHeader book={this.props.book}/>
                {this.props.allHeaders.length !== 0 ? (<Headers>
                    {this.props.allHeaders.map((header, i) => {
                        return (
                            <Link
                                to={{pathname: `/books/${this.props.id}/page/${header.page}`}}
                                key={i}
                                activeClassName='navigation__link--active'
                            >
                                <span>{header.page}</span>
                                <HeaderName>{header.header}</HeaderName>
                            </Link>
                        );
                    })}
                </Headers>) : null}
            </Section>
        );
    }
}

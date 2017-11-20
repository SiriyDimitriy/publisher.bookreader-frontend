import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-isomorphic-tools';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  top: 14rem;
  left: 0;
  width: 25rem;
  font-size: 3rem;
  border: 1px solid black;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
`;

export default class BookHeadersNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section>
        {this.props.allHeaders.map((header, i) => {
          return (
            <Link
              to={{ pathname: `/books/${this.props.id}/page/${header.page}` }}
              key={i}
            >
              <span>{header.page}</span>
              <span>{header.header}</span>
            </Link>
          );
        })}
      </Section>
    );
  }
}

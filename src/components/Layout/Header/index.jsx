// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import { Row, Col } from 'antd';
import Search from './Search';

const H1 = styled.h1`
  font-size: 3.5rem;
  line-height: 4.3rem;
  // font-family: Qanelas;
  font-weight: 500;
  letter-spacing: -0.1px;
  color: #4a4a4a;
`;
const P = styled.p`
  // font-family: Qanelas;
  font-size: 2.1rem;
  line-height: 2.2rem;
  font-weight: 500;
  letter-spacing: -0px;
  color: #4a4a4a;
`;

export default class Header extends PureComponent {
  static propTypes = {
    pageTitle: PropTypes.string,
    subTitle: PropTypes.string
  };
  render() {
    const { pageTitle, subTitle } = this.props;
    return (
      <Row type='flex' justify='space-between' align='middle'>
        <Col>
          <H1>{pageTitle}</H1>
          <P>{subTitle}</P>
        </Col>
        <Col>
          <Search placeholder='Search' />
        </Col>
      </Row>
    );
  }
}

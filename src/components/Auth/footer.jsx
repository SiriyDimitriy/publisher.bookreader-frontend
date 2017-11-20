// Core
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Footer = styled.footer`
  width: 100%;
  height: 7rem;
  background-color: #f5f5f5;
`;

const Copyright = styled.p`
  font-size: 1.4rem;
  font-family: Qanelas;
  text-align: center;
  color: #30446e;
  opacity: 0.5;
  margin: 0 0 1rem 0;
`;

const LinkWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const LinkStele = styled(Link)`
  opacity: 0.5;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  font-family: Qanelas;
  color: #30446e;
  margin: 0 0.5rem 0 0.5rem;
  text-decoration: none;
`;

export default class AuthFooter extends React.Component {
  render() {
    const LinksList = [
      { text: 'Contact', link: '' },
      { text: 'Terms', link: '' },
      { text: 'Privacy', link: '' }
    ];
    return (
      <Footer>
        <Copyright>Copyright © 2014-201 Copy</Copyright>
        <LinkWrap>
          {LinksList.map((item, index) => (
            <LinkStele to={item.link} key={index}>
              {item.text}
            </LinkStele>
          ))}
        </LinkWrap>
      </Footer>
    );
  }
}

AuthFooter.propTypes = {
  LinksList: PropTypes.array
};

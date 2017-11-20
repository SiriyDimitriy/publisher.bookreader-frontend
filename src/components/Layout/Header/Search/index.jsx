// Core
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Componets
import { Icon } from 'antd';

const SearchInputWrap = styled.div`position: relative;`;

const Prefix = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  line-height: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 2rem;
  left: 1rem;
  & + input {
    padding-left: 4rem;
  }
`;

const SearchInput = styled.input`
  width: 21.1rem;
  height: 5.3rem;
  border-radius: 10rem;
  background-color: rgba(0, 0, 0, 0.04);
  border: none;
  padding: 0 2rem;
  font-family: Qanelas;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: -0px;
  color: #4a4a4a;
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(16, 142, 233, 0.5);
  }
`;

export default class Search extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string
  };

  render() {
    const { placeholder } = this.props;
    return (
      <SearchInputWrap>
        <Prefix>
          <Icon type='search' />
        </Prefix>
        <SearchInput type='text' placeholder={placeholder} />
      </SearchInputWrap>
    );
  }
}

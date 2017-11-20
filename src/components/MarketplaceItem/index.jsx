import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-isomorphic-tools';
import styled from 'styled-components';

const Card = styled.div`
  font-family: Qanelas;
  height: 200px;
  border-radius: 10px;
  background-color: #5d108b;
  padding: 2.6rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`;

const CardHeader = styled.div`width: 19.5rem;`;

const Title = styled.h3`
  font-size: 2.1rem;
  line-height: 2.6rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.25;
  color: #ffffff;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid #fff;
  width: 10rem;
  height: 4.1rem;
  transition: box-shadow 0.3s ease;
  box-sizing: border-box;
  position: absolute;
  bottom: 2.6rem;
  right: 4rem;
  span {
    font-size: 1.6rem;
    font-weight: 500;
    color: #ffffff;
  }
  &:hover {
    box-shadow: inset 0px 0px 5px #fff;
  }
`;

export default class MarketplaceItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    bg: PropTypes.string
  };
  render() {
    const { title, subtitle, bg } = this.props;
    return (
      <Card style={{ backgroundColor: bg }}>
        <CardHeader>
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </CardHeader>
        <Button>
          <span>Explore</span>
        </Button>
      </Card>
    );
  }
}

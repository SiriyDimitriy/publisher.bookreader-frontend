// Core
import React from 'react';

// Components
import { Row, Col } from 'antd';
import MarketplaceItem from '../MarketplaceItem';

const items = [
  {
    title: 'Vydavnytstvo',
    subtitle: 'Start exploring this publisher’s books',
    logo: '',
    bg: '#5d108b'
  },
  {
    title: 'Bukva',
    subtitle: 'Best books for students on holidays',
    logo: '',
    bg: '#d7841a'
  },
  {
    title: 'Books for Holidays',
    subtitle: 'Best books for students on holidays',
    logo: '',
    bg: '#1ad78f'
  }
];

export default class MarketplaceContainer extends React.Component {
  render() {
    return (
      <section>
        <Row gutter={24}>
          {items.map((el, i) => {
            return (
              <Col xs={{ span: 12 }} md={{ span: 10 }} lg={{ span: 6 }} key={'col' + i}>
                <MarketplaceItem
                  title={el.title}
                  subtitle={el.subtitle}
                  logo={el.logo}
                  bg={el.bg}
                  key={i}
                />
              </Col>
            );
          })}
        </Row>
      </section>
    );
  }
}

import React from 'react';
import styled from 'styled-components';

const MediaWrapper = styled.section`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  img {
    object-fit: cover;
    width: 100%;
  }
`;

export default class Media extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {image} = this.props;
        return (
            <MediaWrapper>
                <img src={image}/>
            </MediaWrapper>
        );
    }
}

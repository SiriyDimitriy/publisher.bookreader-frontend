import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const TextError = styled.p`
    color: red;
    font-size: 1.4rem;
    margin: 0;
    font-family: Qanelas;
`

const errorForm = ({text}) => (
  <TextError>
    {text}
  </TextError>
)

errorForm.propTypes = {
  text: PropTypes.string
}
export default errorForm
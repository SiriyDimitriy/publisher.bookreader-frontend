import React from 'react'
import Footer from '../components/Auth/footer'
import Main from '../components/Auth'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 70px);
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default class Auth extends React.Component {
    render() {
        return (
            <div>
                <Wrapper> 
                    <Main/>  
                </Wrapper>
               <Footer/>
            </div>
        )
    }
}


import React from 'react'
import {NavLink, Link} from 'react-isomorphic-tools'
import styled from 'styled-components'
import logo from '../../assets/k-3soft.png'

export default class Navigation extends React.Component {
    render() {
        return (
            <Wrapper>
                <Link to={{pathname: '/'}}><img src={logo}/></Link>
                <Items>
                    <NavItem to={{pathname: '/test'}}>
                        Preload data page
                    </NavItem>
                </Items>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    display: flex;
    img{
        height: 4rem;
        margin: 0 1rem;
    }
    a{
        height: 4rem;
    }
    align-items: center;
    border-radius: 0 0 0.5rem 0.5rem;
    box-shadow: 0px 0px 0.6rem 0.1rem rgba(0, 0, 0, 0.17);
    background: white;
`

const Items = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    li{
        display: inline-block;
        padding: 1rem 1.5rem;
        color: black;
        text-decoration: none;
        text-transform: uppercase;
    }
    a.active li{
        background: rgb(243, 243, 243);
        
    }
    a.active li{
        color: #3c3c3c;
    }
    
`

const NavItem = ({children, ...props}) => {
    return <NavLink {...props}><li>{children}</li></NavLink>
}
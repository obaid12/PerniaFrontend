import styled from "styled-components";

import Navbar2 from "../../components/Navbar"
// import Footer from "../components/Footer";
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import {
    ListGroup,
    ListGroupItem,
    Nav,
    NavItem,
    NavLink,
    UncontrolledCollapse,
  } from 'reactstrap';
  
  //import { MENUS } from './menu';
 


const Sidebar = () => {
  const MENUS = [
    {
      name: 'Profile',
      as: 'a',
      href: '/userProfile/profile',
      label: 'Profile',
      icon: 'fas fa-user',
    },
    {
      name: 'Addresses',
      as: 'a',
      href: '/userProfile/addresses',
      label: 'Addresses',
      icon: 'fab fa-home',
    },
    
  
    {
      name: 'Orders',
      as: 'a',
      href: '/userProfile/order',
      label: 'Orders',
      icon: "fab fa-first-order",
    }
    
    
  
  
  
 
  ];
 
    useEffect(() => {
        
    }, [])

    return (
      <>
      
        <Container>
            
            <Wrapper>
                <h2 style={{textAlign:'center'}}>My Account</h2>
        <ListGroup style={{display:'flex',listStyle:'none',
    flexDirection: 'column'}}>
        
          {MENUS.map((item, k) => {
            //const isActive = activeLink === item.name ? true : false;
            return (
              <ListGroupItem style={{marginTop:'15px'}}
                key={`l${k}`}
                //active={isActive}
                tag={item.as}
                href={item.href}
              >
                {item.icon && <i className={item.icon}></i>} {item.label}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Wrapper>
        
        </Container>
      
        </>
    );
};

export default Sidebar;






const Container = styled.div``;
const Wrapper= styled.div`
    margin-top:60px;
    margin-left: 200px;
    background-color:#f8f7f7f6;
    height:46vh;
    
    position:fixed;
    width:240px;
    border:1px solid ;
       // margin:auto;        
       

`;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const Productshow = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
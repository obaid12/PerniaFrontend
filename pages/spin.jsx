import styled from "styled-components";

import { useEffect, useState } from 'react';

import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css';
import {  Spinner } from 'react-bootstrap'

import Head from 'next/head'
const Spin = () => {
        
    return (
        <Container>
        <Spinner
                     as="span"
                     variant="light"
                     size="sm"
                     role="status"
                     aria-hidden="true"
                     animation="border"/>
                     <label style={{color:'white',marginLeft:'auto',marginRight:'auto'}}>Proceessing......</label>
    </Container>
                    

    );
};

export default Spin;






const Container = styled.div`
display:flex;
              flex-direction:row;
              transition: all .5s ease;
              color: #000000;
              border: 2px solid black;
              min-width: 100%;
              text-transform: uppercase;
              text-align: center;
              line-height: 1;
              margin-bottom:15px;
              font-size: 20px;
              background-color: teal;
              padding: 15px;
              outline: none;
              border-radius: 4px;

              &:hover {
                color: #ffffff;
              background-color: teal;
              border: 2px solid teal;`;




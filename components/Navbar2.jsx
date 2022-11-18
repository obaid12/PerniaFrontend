import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

import {
  Search,
  ShoppingCartOutlined,
  LocalShippingOutlined,
  VerifiedUser,
  Person
} from "@material-ui/icons";
import { Avatar, Badge } from "@material-ui/core";
import router, { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import nav from "../styles/navbar.module.css";
import axios from "axios";
import logo from "../public/pernialogo.png";
import jwt_decode from "jwt-decode";

import Navbar from 'react-bootstrap/Navbar'

//import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
//import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {  Nav } from "react-bootstrap";

import { NavDropdown } from "react-bootstrap";
import { Container } from "react-bootstrap";

const MyNavbar = () => {
  const [blist, setBlist] = useState(false);
  const [loggedIn, setloggedIn] = useState("");
  const [user, setUser] = useState({
    first_name: "",
  });
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [coll, setColl] = useState([]);
  const [show, setShow] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  let scrollToken = null;

  function mouseEnter(direction) {
    scrollToken = setInterval(function () {
      if (direction === "down") {
        setBlist(true);
      } else {
      }
    }, 3);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setloggedIn(localStorage.getItem('token'))
      console.log('token',localStorage.getItem('token'))
      //setloggedIn("");
      var decoded = jwt_decode(localStorage.getItem("token"));
      setUser(decoded.result);
    } else {
      setloggedIn("");
    }
    let list = [];

    axios
      .get(`https://mazglobal.co.uk/maz-api/categories`)
      .then((resp) => {
        setCats(resp.data.data);
      })
      .catch((err) => console.log(err));
  
  }, []);
  return (
    <>
   
      <Navbar
        variant="dark"
        bg="drak"
        expand="lg"
        style={{ marginTop: "-60px" }} 
      >
        <Container fluid>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav style={{ marginLeft: "auto", marginRight: "auto" }}>
              {/* <Nav.Item
                style={{ marginLeft: "10px" ,color:'black'}}
                id="nav-dropdown-dark-example"
                title="NewIn"
                menuVariant="dark"
              >
              </Nav.Item> */}
             
              
              <NavDropdown
                style={{ marginLeft: "10px" }}
                id="nav-dropdown-dark-example"
                title="Brands"
                menuVariant="dark"
              >
                {items.map((cl) => (
                  <Link key={cl.id} href="/brand/[id]" as={`/brand/${cl.id}`}>
                    <NavDropdown.Item href="category/${cl.id}">
                      {cl.name}
                    </NavDropdown.Item>
                  </Link>
                ))}
              </NavDropdown>

              {cats.map((cItem) => (
                <NavDropdown
                  key={cItem.id}
                  style={{ marginLeft: "10px" }}
                  id="nav-dropdown-dark-example"
                  title={cItem.name}
                  menuVariant="dark"
                >
                  {coll.map((cl) =>
                    cl.category_id == cItem.id ? (
                      <Link href="/category/[id]" as={`/category/${cl.id}`}>
                        <NavDropdown.Item href="category/${cl.id}">
                          {cl.name}
                        </NavDropdown.Item>
                      </Link>
                    ) : (
                      ""
                    )
                  )}
                </NavDropdown>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Nav activeKey="/homeLink">
        <Nav.Item>
          <Nav.Link href="/homeLink">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/OtherLink">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
        </Nav.Item>
      </Nav>

      </>

  );
};

export default MyNavbar;

// const Container = styled.div`
// background-color:#333333;
//                 height: 80px;
//                 ${mobile({ height: "50px" })}

//                 `;

// const Wrapper = styled.div`
//                 padding: 10px 20px;
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 ${mobile({ padding: "10px 0px" })}

//                 `;

// const Left = styled.div`
//                 flex: 1;
//                 display: flex;
//                 align-items : center;
//                 padding-right: 100px;

//                 `;
// const Logo = styled.div`
// color:white;
//                 font-weight: bold;
//                 font-size: xx-large;
//                 ${mobile({ fontSize: "20px" })}

//                 `;

// const SearchContainer = styled.div`
//                 border: 0.5px solid lightgray;

//                 display: flex;
//                 align-items: center;
//                 margin-left: 15px;
//                 `;

// const Input = styled.input`
//                 border: none;
//                 ${mobile({ width: "50px" })}

//                 `;

// const Center = styled.div`
//                 flex: 1;
//                 text-align: center;
//                 display: flex;
//                 align-items : center;

//                 justify-content: space-between;
//                 `;

// const Right = styled.div`
//                 flex: 1;
//                 display: flex;
//                 align-items : center;
//                 justify-content: flex-end;

//                 `;

// const MeniItems = styled.div`
// transition: all .5s ease;
//    color: #000000;
//    text-align: center;
//    cursor:pointer;
//    line-height: 1;
//    font-size: 14px;
//    background-color : transparent;
//    padding-left:10px;
//    padding-right:10px;
//    padding-top:5px;
//    padding-bottom:5px;
//    outline: none;
//    border-radius: 50px;

//    &:hover {
//    color: #ffffff;
//    background-color: #c9c9c9;

// }
//                 `;

// const StyledLink = styled(Link)`

// text-decoration: none;
//                 color: white !important;

//                 `;

// const NavbarDropdown = styled.div`
//                 position: relative;
//                 /* display: inline-block; */
//                 &:hover .my__unique__button__class-asdf123 {
//                     display: block;
//   }
//                 `;
// const NavbarDropdownContent = styled.div`
// margin-top: 0px;
//                 display: none;
//                 position: absolute;
//                 background-color: #f3f3f3;
//                 min-width: 100px;
//                 box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0, 2);

//                 z-index: 1;
//                 `;

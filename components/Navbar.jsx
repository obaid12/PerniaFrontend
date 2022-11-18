import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
import nav from "../styles/navbar.module.css";
import axios from "axios";
import logo from "../public/pernialogo.png";
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from 'react-bootstrap/Navbar'

//import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
//import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {  Nav } from "react-bootstrap";

import { NavDropdown } from "react-bootstrap";
import { Container } from "react-bootstrap";

const Navbar2 = () => {
  const [blist, setBlist] = useState(false);
  const [loggedIn, setloggedIn] = useState("");
  const [user, setUser] = useState({
    first_name: "",
  });
  const [items, setItems] = useState([])
  const [dumyItems, setDumyItems] = useState([
    {address: "Bahria",
    description: "This beautiful greyish blue shirt is crafted with gold and silver touch on organza. For classic touch we add gota work which enhanced the beauty of piece",
    email: "maheenzaib123@gmail.com",
    featured: "No",
    header: null,
    id: 46,
    logo: null,
    name: "Maheen Zaib",
    phone: "051-5356874"
    },
    {address: "Bahria",
    description: "This beautiful greyish blue shirt is crafted with gold and silver touch on organza. For classic touch we add gota work which enhanced the beauty of piece",
    email: "maheenzaib123@gmail.com",
    featured: "No",
    header: null,
    id: 47,
    logo: null,
    name: "Maheen Zaib1",
    phone: "051-5356874"
    },
    {address: "Bahria",
    description: "This beautiful greyish blue shirt is crafted with gold and silver touch on organza. For classic touch we add gota work which enhanced the beauty of piece",
    email: "maheenzaib123@gmail.com",
    featured: "No",
    header: null,
    id: 46,
    logo: null,
    name: "Maheen Zaib",
    phone: "051-5356874"
    },
    {address: "Bahria",
    description: "This beautiful greyish blue shirt is crafted with gold and silver touch on organza. For classic touch we add gota work which enhanced the beauty of piece",
    email: "maheenzaib123@gmail.com",
    featured: "No",
    header: null,
    id: 47,
    logo: null,
    name: "Maheen Zaib1",
    phone: "051-5356874"
    },
  ]);



  const [text, setText] = useState('')
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

  function mouseLeave() {
    clearInterval(scrollToken);
  }

  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  const removeToken = () => {
       console.log('hry removvee')
       localStorage.removeItem('token')
        router.push('/account/login')
  };

  const handleChange = (e) => {
    setText(e.target.value)
};


  
  const showText=()=>{
    let status=false
 
     if(text=='')
     {
      
     }
    else{
   router.push(
     { pathname: "/allproducts", query: { text: text } }
    
   );
   }
 }

  // useEffect(() => {
  //   if(localStorage.getItem('token'))
  //   {
  //   setloggedIn(localStorage.getItem('token'))
  //  var decoded = jwt_decode(localStorage.getItem('token'));
  //  setUser(decoded.result)
  //   }
  //   else{
  //       setloggedIn('')
  //   }
  // },[])
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
      .get(`https://api.perniacouture.pk/pernia-api/suppliers`)
      .then((resp) => {
        resp.data.data.map((it, i) => {
          console.log("brand",it);
          list.push(it);
        });
        setItems(list);
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://api.perniacouture.pk/pernia-api/categories`)
      .then((resp) => {
        setCats(resp.data.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://api.perniacouture.pk/pernia-api/collections`)
      .then((respo) => {
        setColl(respo.data.data);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);
  return (
    <div className={nav.Container}>
      <div className={nav.Wrapper}>
        <div className={nav.Left}>
          <hr />
          <div className={nav.MeniItems}>
            <div className={nav.StyledLink} href="/">
              <p>
                {/* <img src="https://wirdanwebsite.000webhostapp.com/images/pernialogo.png" width={100} height={100}/> */}
                <Link href="/" as={`/`}>
                  <img
                    src="/pernia.png"
                    
                    className={nav.Logo}
                    width={100}
                  />
                </Link>
              </p>
            </div>
          </div>

         
        </div>

       

        <div className={nav.Right}>
          {/* alt={user.first_name} */}
          {/* {loggedIn? */}

         
            <div className={nav.Link}>
              <div className={nav.StyledLink}>
                <div className={nav.icons}>
                  <div className={nav.SearchContainer} style={{borderRadius:'8px'}}>
                     <input className={nav.src} type="search" value={text}  onChange={(e)=>setText(e.target.value)} placeholder="Search Product"/>
                    {/* <Search  style={{color:'black'}}/>  */}
                   <Search className={nav.srcIcon}   onClick={()=>showText()}/>
                  </div>
                  <LocalShippingOutlined
                  className={nav.shipping} 
                    color="action"
                   
                  />
                   <Link href="/cart" as={`/cart`}>
                  {cartItems.length > -1 && (
                    <Badge badgeContent={cartItems.length} color="primary">
                      <ShoppingCartOutlined
                        color="action"
                        style={{
                          cursor: "pointer",
                          color: "black",
                          fontSize: "38px",
                          marginRight: "20px",
                        }}
                      />
                    </Badge>
                  )}
                  </Link>
                </div>
              
              </div>
            </div>
         
{/*          
          <div className={nav.NavbarDropdown}>
              <div className={nav.MeniItems}>
                <Avatar
                  alt={user.first_name}
                  src="/static/images/avatar/1.jpg"
                />
              </div>
              <div className={nav.NavbarDropdownContent}>
                <div className={nav.Link} href='userProfile/profile' >
                <div className={nav.MeniItems}>Account</div></div>
                <br />
                <div className={nav.MeniItems} onClick={removeToken}>LogOut</div><br />
              </div>
            </div> */}








          {loggedIn != "" ? (

               <NavDropdown
                style={{ marginLeft: "10px" }}
                id="nav-dropdown-dark-example"
                title={<Avatar
                  alt={user.first_name}
                  src="/static/images/avatar/1.jpg"
                />}
                menuVariant="light"
                >
                  
                  <Link href="userProfile/profile" >
                    <NavDropdown.Item href="userProfile/profile">
                      Account
                    </NavDropdown.Item>
                  </Link>
                
                <NavDropdown.Divider />
                <NavDropdown.Item  >
                  <p onClick={()=>removeToken()}>Logout</p>
                </NavDropdown.Item>
                </NavDropdown>
            
          ) : (
           
            <NavDropdown
                style={{ marginLeft: "10px" }}
                id="nav-dropdown-dark-example"
                title={<Person/>}
                menuVariant="light"
                >
                  
                  <Link href="/account/login" >
                    <NavDropdown.Item href="/account/login">
                      Login
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/account/register" >
                    <NavDropdown.Item href="/account/register">
                      Register
                    </NavDropdown.Item>
                  </Link>
                
                <NavDropdown.Divider />
                
                </NavDropdown>

          )}
          <>
            {/* <div className={nav.MeniItems}> <div className={nav.StyledLink} href="/account/register"> Register </div></div>
                        <div className={nav.MeniItems}> <div className={nav.StyledLink} href="/account/login"> Login </div></div> */}
          </>
          {/* } */}
        </div>
      </div>
    
      <Navbar
        variant="dark"
        bg="dark"
        expand="lg"
   
      >
        <Container fluid>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav style={{ marginLeft: "auto", marginRight: "auto" }}>
              {/* <NavDropdown
                style={{ marginLeft: "10px" }}
                id="nav-dropdown-dark-example"
                title="NewIn"
                menuVariant="dark"
              >
                
              </NavDropdown> */}
              <Nav.Link>NewIn</Nav.Link>
              <NavDropdown
                style={{ marginLeft: "10px" }}
                id="nav-dropdown-dark-example"
                title="Brands"
                menuVariant="dark"
              >
              


{items.map((cl) => (
                  <Link key={cl.id} href="/brand/[id]" as={`/brand/${cl.id}`}>
                    <NavDropdown.Item href="brand/`${cl.id}`">
                      {cl.name}
                    </NavDropdown.Item>
                  </Link>
                ))}
              </NavDropdown>

              









              
              {cats.map((cItem) => (
                cItem.name=='Sale' || cItem.name=='Pret'||cItem.name=='Luxury Pret'
                ||cItem.name=='MEN'||cItem.name=='KIDS WEAR'?
                <Nav.Link>{cItem.name}</Nav.Link>:
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
     

      
    </div>
  );
};

export default Navbar2;

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

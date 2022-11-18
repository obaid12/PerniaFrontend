import styled from "styled-components";
import Sidebar from "./Sidebar";
// import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import React, { memo } from 'react';
import jwt_decode from 'jwt-decode';
import {  Button,Modal, ModalBody, ModalFooter ,ModalHeader, } from "reactstrap";
import axios from 'axios';
import { useRouter } from "next/router";
import { DeleteOutline, Edit,EmailOutlined, Phone ,LocationCity, SettingsInputSvideoRounded} from '@material-ui/icons';
import {
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  UncontrolledCollapse,
} from "reactstrap";


import Newsletter from "../../components/foot/Newsletter";
import Footer from "../../components/foot/Footer";
import Navbar2 from "../../components/Navbar";
import Head from 'next/head'

const Addresses = () => {
 
  const [modal, setModal] = React.useState(false);
  const [movemodal, setMoveModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const movetoggle = () => setMoveModal(!movemodal);
  const [radio, setRadiobtn] = useState({
    selected: '',
  });
  const [user_id,setUserId]=useState(null)
  const [s_id,setSId]=useState(null)
  
  const [editshipdiv, setEditShipDiv] = useState(false) ;
  const [newship,setNewShip]=useState([{
    id:null,
    user_address:'',
    name:'',
    type:'',
    city:'',
    province:'',
    country:'',
    postal_code:''
}])




    const [ship,setShip]=useState([{
        id:null,
        user_address:'',
        name:'',
        type:'',
        city:'',
        province:'',
        country:'',
        postal_code:''
    }])
    const [bill,setBill]=useState([{
      id:null,
      user_address:'',
      name:'',
      type:'',
      city:'',
      province:'',
      country:'',
      postal_code:''
  }])
  useEffect(() => {
    const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      console.log('in Edit page useeffec');
      
    var decoded = jwt_decode(localStorage.getItem('token'));
    console.log('decoded',config);
    setUserId(decoded.result.id)
    axios
        .get(`http://localhost:8080/ecom-api/addresses/${decoded.result.id}`, config)
        .then(res=>{
            let shiplist=[]
            let billship=[]
            res.data.data.map(item=>{
              if(item.type==='billing')
              {
                billship.push(item)
              }
              else{
                if(shiplist.length==0)
                radio.selected=item.id
                shiplist.push(item)
              }
            })
            setShip(shiplist)
            setBill(billship)
            console.log('user',res.data.data);
        })
        .catch(err=>console.log(err))
  }, []);

  const handleradioChange = item => e => {
    setRadiobtn({
      selected: e.target.value,
    });
    // let newlist=[]
    // newlist.push(item)
    // for(let i=0;i<ship.length;i++)
    // {
    //   if(item.id==ship[i].id)
    //   ''
    //   else
    //    newlist.push(ship[i])
    // }
    // setShip(newlist)
    
    console.log(e.target.value);
  };


  const handleEditChange = (name) => (e) => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    console.log("value",value);
    setNewShip({
        ...newship,
        [name]: value
    })
  }
  const getShipAddress = (item) => (e) => {
    setEditShipDiv(true)
     setNewShip(item)
     setSId(item.id)
}
  
const submitEditHandler=(e)=>{
  e.preventDefault();
  console.log("before",newship);
  newship.type='shipping'
  axios.put(`http://localhost:8080/ecom-api/addresses/${newship.id}`,newship)
.then(response=>{
  console.log("rsponse",response.data)
  
  setEditShipDiv(false)
    console.log("Add Search")
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const ship_arr = [];
    axios
      .get(`http://localhost:8080/ecom-api/addresses/${user_id}`, config)
      .then(response => {
        var i = 0;
        response.data.data.map(item => {
          if (item.type == 'shipping') {
            if (i == 0) {
             
              ship_arr.push(item);
              
              setRadiobtn({
                selected:item.id
              })
              
              i = i + 1;
            }
            else{
              ship_arr.push(item);
            }
            
          } else '';
        });
        setShip(ship_arr);s
      
      })
      .catch(err => console.log(err))
} 
)
.catch(error=>{
  console.log(error)
})
}




  return (
    <>
      <Head>
        <title>Addresses</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
    <Navbar2/>
    <Container>
      <Sidebar />
      <Address>Addresses</Address>
      <UserDiv>
        


         <div style={{display:'flex',flexDirection:'row'}}>
      {bill.map((item,i)=>(
          <ShippingData key={i}>
            {i===0 ?
            <>
             <div style={{width:'50px',backgroundColor:'grey' ,marginBottom:'20px',borderStyle:'groove',marginLeft:'-20px',marginTop:'-20px'}}>
               <labe style={{textAlign:'center',color:'white'}}>Default</labe></div>
             <div style={{display:'flex',flexDirection:'row'}}>
               <label style={{color:'red'}}>{item.type}</label>
               <Edit style={{color:'grey',marginLeft:'90px',fontSize:'20px'}}/>
             </div>
            <h3><u>{item.name}</u></h3>
            <h5 style={{color:'grey'}}>{item.user_address}</h5>
            <h5 style={{color:'grey',marginTop:'-10px'}}>{item.country}</h5>
            <h5 style={{color:'grey',marginTop:'-10px'}}>{item.city}</h5>
            <div style={{display:'flex',flexDirection:'row'}}><input type='radio' checked value={item.id} />
            <label style={{fontSize:'14px'}}>Active </label></div>
            </>
             :
             <>
             <div style={{display:'flex',flexDirection:'row'}}>
             <label style={{color:'green'}}>{item.type}</label>
             <Edit style={{color:'grey',marginLeft:'90px',fontSize:'20px'}}/>
           </div>
          <h3><u>{item.name}</u></h3>
          <h5 style={{color:'grey'}}>{item.user_address}</h5>
          <h5 style={{color:'grey',marginTop:'-10px'}}>{item.country}</h5>
          <h5 style={{color:'grey',marginTop:'-10px'}}>{item.city}</h5>
          <div style={{display:'flex',flexDirection:'row'}}><input type='radio' />
          <label style={{fontSize:'14px',marginLeft:'3px'}}>Make this as a default </label></div>
          </>
            }
             
            </ShippingData>
        ))}
        </div>
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>


        {ship.map((item,i)=>(
          <ShippingData key={item.id} >
            {radio.selected==item.id ?
            <div >
             <div style={editshipdiv && s_id==item.id?{display:'none'}:{width:'50px',backgroundColor:'grey' ,marginBottom:'20px',borderStyle:'groove',marginLeft:'-20px',marginTop:'-20px'}}>
               <labe style={{textAlign:'center',color:'white'}}>Default</labe></div>
             <div style={editshipdiv && s_id==item.id?{display:'none'}:{display:'flex',flexDirection:'row'}}>
               <label style={{color:'red'}}>{item.type}</label>
               <Edit onClick={getShipAddress(item)} style={editshipdiv && s_id==item.id?{display:'none'}:{color:'grey',marginLeft:'90px',fontSize:'20px',cursor:'pointer'}}/>
             </div>
            <h3 style={editshipdiv && s_id==item.id?{display:'none'}:{}}><u>{item.name}</u></h3>
            <h5 style={editshipdiv && s_id==item.id?{display:'none'}:{color:'grey'}}>{item.user_address}</h5>
            <h5 style={editshipdiv && s_id==item.id?{display:'none'}:{color:'grey',marginTop:'-10px'}}>{item.country}</h5>
            <h5 style={editshipdiv && s_id==item.id?{display:'none'}:{color:'grey',marginTop:'-10px'}}>{item.city}</h5>
            <div style={editshipdiv && s_id==item.id?{display:'none'}:{display:'flex',flexDirection:'row'}}>
              <input type='radio' checked value={item.id} />
            <label style={editshipdiv && s_id==item.id?{display:'none'}:{fontSize:'14px'}}>Active </label></div>
            {s_id===item.id && editshipdiv &&
             <Form onSubmit={submitEditHandler} >
             <div style={{marginLeft:'-10px',marginBottom:'5px'}}>
               <div >
                 <label>Address</label>
                 <input
                   type="text"
                   placeholder="Type Address"
                   className="form-control"
                   name="user_address"
                   value={newship.user_address}
                   onChange={handleEditChange("user_address")}
                 />
               </div>
             </div>
             <div  style={{marginLeft:'-10px',marginBottom:'5px'}}>
               <div >
                 <label>Title</label>
                 <input
                   type="text"
                   placeholder="Type Title"
                   className="form-control"
                   name="name"
                   value={newship.name}

                   onChange={handleEditChange("name")}
                 />
               </div>
             </div>

             
             <div style={{marginLeft:'-10px',marginBottom:'5px'}}>
                 <label >City</label>
                 <input
                   type="text"
                   name="city"
                   value={newship.city}
                   className="gap"
                   placeholder="Your City"
                   onChange={handleEditChange("city") }
                 />
               
             </div>
             
             <div style={{marginLeft:'-10px',marginBottom:'5px'}}>
                 <label >Postal Code</label>
                 <input
                   type="text"
                   name="postal_code"
                   value={newship.postal_code}
                  
                   placeholder="City Code"
                   onChange={handleEditChange("postal_code") }
                 />
               
             </div>
            
              
              
           
             <div style={{marginLeft:'-10px',marginBottom:'5px'}}>
                 <label >Country</label>
                 <input
                   type="text"
                   name="country"
                   value={newship.country}
                   className="gap"
                   placeholder="Your Country"
                   onChange={handleEditChange("country") }
                 />
               
             </div>
             
             <div style={{marginLeft:'-10px',marginBottom:'5px'}}>
                 <label >State/Province</label>
                 <input
                   type="text"
                   name="province"
                   value={newship.province}
                   placeholder="Your State"
                   onChange={handleEditChange("province") }
                 />
               
             </div>
            
             <button type="submit"style={{marginRight:'4px',cursor:'pointer',width:'70px',marginTop:'10px',backgroundColor:'darkblue',color:'white',borderRadius:'4px'}} >
               Update
             </button>
             <button style={{backgroundColor:'red',color:'white',width:'70px',marginTop:'10px',cursor:'pointer',borderRadius:'4px'}}
               onClick={() => setEditShipDiv(false)}
              
             >
                 Close
             </button>
           </Form>

             }   
            </div>
             :
             <div >
             <div style={editshipdiv && s_id==item.id?{display:'none'}:{display:'flex',flexDirection:'row'}}>
               <label style={{color:'green'}}>{item.type}</label>
               <Edit onClick={getShipAddress(item)} style={editshipdiv && s_id==item.id?{display:'none'}:{color:'grey',marginLeft:'90px',fontSize:'20px',cursor:'pointer'}}/>
             </div>
           <h3 style={editshipdiv && s_id==item.id?{display:'none'}:{}}><u>{item.name}</u></h3>
            <h5 style={editshipdiv && s_id==item.id?{display:'none'}:{color:'grey'}}>{item.user_address}</h5>
            <h5 style={editshipdiv && s_id==item.id?{display:'none'}:{color:'grey',marginTop:'-10px'}}>{item.country}</h5>
            <h5 style={editshipdiv && s_id==item.id?{display:'none'}:{color:'grey',marginTop:'-10px'}}>{item.city}</h5>
            <div style={editshipdiv && s_id==item.id?{display:'none'}:{display:'flex',flexDirection:'row'}}>
              <input type='radio' checked={radio.selected === item.id?true:radio.selected==item.id} value={item.id} onChange={handleradioChange(item)}/>
              <label style={{fontSize:'14px',marginLeft:'3px'}}>Make this as a default </label></div>
            {s_id==item.id && editshipdiv &&
             <Form onSubmit={submitEditHandler} >
             <div style={{marginLeft:'-10px',marginBottom:'5px'}}>
               <div >
                 <label>Address</label>
                 <input
                   type="text"
                   placeholder="Type Address"
                   className="form-control"
                   name="user_address"
                   value={newship.user_address}
                   onChange={handleEditChange("user_address")}
                 />
               </div>
             </div>
             <div  style={{marginLeft:'-10px',marginBottom:'5px'}}>
               <div >
                 <label>Title</label>
                 <input
                   type="text"
                   placeholder="Type Title"
                   className="form-control"
                   name="name"
                   value={newship.name}

                   onChange={handleEditChange("name")}
                 />
               </div>
             </div>

             
             <div style={{marginLeft:'-10px',marginBottom:'5px'}}>
                 <label >City</label>
                 <input
                   type="text"
                   name="city"
                   value={newship.city}
                   className="gap"
                   placeholder="Your City"
                   onChange={handleEditChange("city") }
                 />
               
             </div>
             
             <div style={{marginLeft:'-10px',marginBottom:'5px'}}>
                 <label >Postal Code</label>
                 <input
                   type="text"
                   name="postal_code"
                   value={newship.postal_code}
                  
                   placeholder="City Code"
                   onChange={handleEditChange("postal_code") }
                 />
               
             </div>
            
              
              
           
             <div style={{marginLeft:'-10px',marginBottom:'5px'}}>
                 <label >Country</label>
                 <input
                   type="text"
                   name="country"
                   value={newship.country}
                   className="gap"
                   placeholder="Your Country"
                   onChange={handleEditChange("country") }
                 />
               
             </div>
             
             <div style={{marginLeft:'-10px',marginBottom:'5px'}}>
                 <label >State/Province</label>
                 <input
                   type="text"
                   name="province"
                   value={newship.province}
                   placeholder="Your State"
                   onChange={handleEditChange("province") }
                 />
               
             </div>
            
             <button type="submit"style={{marginRight:'4px',cursor:'pointer',width:'70px',marginTop:'10px',backgroundColor:'darkblue',color:'white',borderRadius:'4px'}} >
               Update
             </button>
             <button style={{backgroundColor:'red',color:'white',width:'70px',marginTop:'10px',borderRadius:'4px',cursor:'pointer'}}
               onClick={() => setEditShipDiv(false)}
              
             >
               Close
             </button>
           </Form>
            }
            </div>
}
            </ShippingData>
        ))}
          
        </div>
      </UserDiv>
        
   
     
     <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader
                   toggle={toggle} >Edit</ModalHeader>
                <ModalBody>
                  
               
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" >Okay</Button>
                </ModalFooter>
            </Modal>


    </Container>
    <Newsletter/>
    <Footer />
    </>
  );
};

export default Addresses;

const Container = styled.div``;
const Details = styled.div``;
const Address = styled.div`
  margin-left: 600px;
  margin-top: 100px;
  margin-bottom:60px;
  font-size: 24px;
  font-weight: bold;
`;
const Wrapper = styled.div`
  margin-top: 30px;
  background-color: #f0f0f0ef;
  height: 46vh;
  position: fixed;
  width: 240px;
  border: 1px solid red;
  margin: auto;
`;
const Image = styled.img`
   height:150px;
   border-radius: 50%;
   margin-left: 40px;
   margin-top:20px ;
  
`;
const ImageArea = styled.div`
 width:600px;
 height:140px;
`;
const Input = styled.input`
 width:160px;
 height:20px;
 padding: 5px;
 text-align: center;
 border-style: 1px  grey;
 box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Form = styled.form`
  padding: 20px;
  /* display: flex;
  flex-wrap: wrap; */
  // background-color: red;
  /* flex-direction: column; */
  margin-top: -20px;
  margin-left:-20px ;
  width: 150px;
  /* -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75); */
  /* margin-left: 40px; */
`;

const UserDiv = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  
  //flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;
  /* -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75); */
  margin-left: 500px;
`;
const ShippingData = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;

  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 150px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 40px;
`;
const Title = styled.h1`
  margin: 20px;
  text-align: center;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
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

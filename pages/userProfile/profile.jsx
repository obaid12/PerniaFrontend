import styled from "styled-components";
import Sidebar from "./Sidebar";
// import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
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
import Navbar2 from "../../components/Navbar"  
import Head from 'next/head'

const Profile = () => {
    const [user,setUser]=useState({
        id:null,
        first_name:'',
        last_name:'',
        email:'',
        phone:'',
        date_of_birth:''
    })
  useEffect(() => {
    const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      console.log('in Edit page useeffec');
      
    var decoded = jwt_decode(localStorage.getItem('token'));
    console.log('decoded',decoded);
    axios
        .get(`http://localhost:8080/ecom-api/users/${decoded.result.id}`, config)
        .then(res=>{
          console.log('user',res.data.data)
          let dat=''
          for(let i=0;i<10;i++)
          dat=dat+res.data.data.date_of_birth[i]
          console.log('jdjsjd',dat)
         res.data.data.date_of_birth=dat

            
            setUser(res.data.data)
            console.log('user',res.data.data);
        })
        .catch(err=>console.log(err))
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
    <Navbar2 />
    <Container>
      <Sidebar />
      <UserDiv>
          <ImageArea>
              <img style={{height:'140px',width:'560px'}} src='https://png.pngtree.com/thumb_back/fh260/back_pic/00/01/50/455603baa711252.jpg'/>
          </ImageArea>
        <Details> 
             
        <h4>General</h4>
        <p style={{marginTop:'-15px',marginBottom:'50px'}}>Setup your general profile details</p>
        <form>
          <FormItem>
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column",marginRight:'20px' }}
            >
              <label>First Name</label>
              <Input
                type="text"
                placeholder={user.first_name}
                name="first_name"
                
              />
            </div>
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Last Name</label>
              <Input
                type="text"
                name="last_name"
                placeholder={user.last_name}
              />
            </div>
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column" }}
            >
             <label style={{textAlign:'center'}}>Profile picture</label>   
            <Image style={{width:'160px',marginLeft:'60px'}} src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'/>
            <input type='file' style={{marginLeft:'50px'}}/>
            </div>
          </FormItem>
          <FormItem   style={{marginTop:'-120px' }}>
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column",marginRight:'20px' }}
            >
              <label>Email</label>
              <div>
              <EmailOutlined style={{padding: '5px',paddingLeft:'0px',fontSize:'18px', minWidth: '40px',marginTop:'4px' ,position:'absolute'}} />
             <Input type='text' name='email' placeholder={user.email}/>
             </div>
             
            </div>
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Phone No</label>
              <div>
              <Phone style={{padding: '5px', minWidth: '40px' ,position:'absolute'}} />
             <Input type='text' name='email' placeholder={user.phone}/>
             </div>
            </div>
          </FormItem>
          
          <FormItem >
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column",marginRight:'20px' }}
            >
              <label>Location</label>
              
              <div>
              <LocationCity style={{padding: '5px', minWidth: '40px' ,position:'absolute'}} />
             <Input type='text' name='location' placeholder='Pakistan'/>
             </div>
             
            </div>
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column",marginRight:'20px' }}
            >
              <label>BirthDay</label>
              
             <Input type='date' name='location' value={user.date_of_birth} />
             
             
            </div>
            
          </FormItem>


        </form>
        </Details>
      </UserDiv>
    </Container>
    <Newsletter/>
    <Footer/>
    </>
  );
};

export default Profile;

const Container = styled.div``;
const Details = styled.div``;
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
const UserDiv = styled.div`
  padding: 20px;
  display: flex;
  height:70vh;
  flex-direction: column;
  margin-top: 90px;
  margin-bottom: 30px;
  width: 600px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 500px;
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

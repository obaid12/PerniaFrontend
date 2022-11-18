

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styled from "styled-components";
import axios from 'axios';
// import router, { useRouter } from 'next/router';
import router from 'next/router';
import Head from 'next/head'

const Login = () => {

  useEffect(() => {
    
  }, []);

  // form validation rules 
  const [mydiv, setMyDiv] = useState(false)
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid Email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),

  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    const json = JSON.stringify(data);
    console.log(json);

    axios.post(`https://perniacouture.pk/pernia-api/users/login`, json,

      { headers: { 'content-type': 'application/json' } }
    )
      .then(res => {
        console.log(res.data)
        if (res.data.success === 1) {
          router.push('/');
          localStorage.setItem('token', res.data.token)
          console.log("user is", res.locals.currentUser)
        }
        else {
          setMyDiv(true)
        }

      }).catch(err => console.log(err));
  }

  const go=()=>{
    router.push('/account/register')
  }

  const backToHome=()=>{
    router.push('/')
  }



  return (

    <Container>
        <Head>
        <title>Login Page</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
     
      <Wrapper>
        <Title>LOG IN</Title>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>

          <Input name="email" placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
          <Error >{errors.email?.message}</Error>

          <Input name="password" type="password" placeholder="Password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
          <Error >{errors.password?.message}</Error>
          <Button  >
            Login
          </Button>
          {mydiv &&
            <Error>Invalid email or password</Error>
          }
          <Link>Forget Password</Link>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <p style={{marginRight:'auto',fontSize:'13px',marginLeft:'-11px'}} className="btn btn-link" onClick={()=>go()}> Create a new Account</p>
          <p style={{fontSize:'13px'}} className="btn btn-link" onClick={()=>backToHome()}> Back to Home</p>
         
          </div>
          {/* </form> */}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  opacity: 80%;
  border-radius: 30px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
color: red;
font-size: small;
  flex: 1;
  padding-left: 10px;
  `;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

// import router, { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styled from "styled-components";
import { useState } from 'react';
import axios from 'axios';
import router from 'next/router';
import Head from 'next/head'

const Register = () => {
    const [mydiv, setMyDiv] = useState(false)

    // form validation rules 
    const schema = Yup.object().shape({
        first_name: Yup.string()
            .required('First Name is required'),
        last_name: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email must be a valid Email')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        mobile: Yup.string()
            .required('Mobile  is required'),
        date_of_birth: Yup.string()
            .required('Date of Birth is required'),
        cPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),

    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmitHandler = (data) => {
        data={
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            mobile: data.mobile,
            phone: data.phone,
            date_of_birth:data.date_of_birth
        }
        const json = JSON.stringify(data);
        console.log(json);

        axios.post(`https://perniacouture.pk/pernia-api/users`, json,

            { headers: { 'content-type': 'application/json' } }
        )
            .then(response => {
                console.log(response.data)
                if (response.data.success === 1) {
                    router.push('/account/login');
                }
                else {
                    setMyDiv(true)
                }

            }).catch((err) => {
                if (err.response.status === 409) {

                    setMyDiv(true)
                }
                console.log(err.response.status)
            });

    }

    const go = () => {
        router.push('/')

    };


    // const onSubmitHandler = (data) => {
    //     console.log({ data });
    //     reset();

    // };



    return (
        <Container>
              <Head>
        <title>Register Page</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
            <Wrapper>
                <Title>Register</Title>
                <Form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Input name="first_name" type="text" placeholder="First Name" {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`} />
                    <Error >{errors.first_name?.message}</Error>

                    <Input name="last_name" type="text" placeholder="Last Name" {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} />
                    <Error >{errors.last_name?.message}</Error>

                    <Input name="email" placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <Error >{errors.email?.message}</Error>
                    {mydiv &&
                        <Error>Email Already Exist</Error>
                    }


                    <Input name="Password" type="password" placeholder="Password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <Error className="invalid-feedback">{errors.password?.message}</Error>

                    <Input name="cPassword" type="password" placeholder="Confirm Password" {...register('cPassword')} className={`form-control ${errors.cPassword ? 'is-invalid' : ''}`} />
                    <Error className="invalid-feedback">{errors.cPassword?.message}</Error>

                    <Input name="mobile" type="phone" placeholder="Mobile No." {...register('mobile')} className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} />
                    <Error >{errors.mobile?.message}</Error>

                    <Input name="phone" type="phone" placeholder="Phone No." {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                    <Error>{errors.phone?.message}</Error>

                    <Input name="date_of_birth" type="date" label="Date of Birth" {...register('date_of_birth')} className={`form-control ${errors.date_of_birth ? 'is-invalid' : ''}`} />
                    <Error >{errors.date_of_birth?.message}</Error>
                   
                   {/* <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}> */}
                   
                   <center>
                   <Button type="submit">
                        Register
                    </Button>
                    </center> 
                    {/* <Button type="submit" onClick={()=>move}>
                        Back to Home
                    </Button> */}
                    {/* </div> */}
                        <p style={{fontFamily:'Helvetica',textDecoration:'none'}} className="btn btn-link" onClick={()=>go()}>  Back to Home</p>
                        
                    {/* </form> */}
                </Form>
            </Wrapper>

        </Container>
    );
};

export default Register;



const Container = styled.div`
  
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80")
      center;
  background-size: cover;
  display: flex;
  height:auto;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  margin: 50px 0px 50px 0px;
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

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  border: 1px solid grey;
  
  border-radius: 5px;

`;
const Error = styled.div`
color: red;
margin-top: -10px;
font-size: small;
  flex: 1;
  `;


const Button = styled.button`
  width: 40%;
  border: none;
  margin-top: 10px;
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
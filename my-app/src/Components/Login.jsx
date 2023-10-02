import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import { Box , Button, TextField, Typography, styled, FormLabel} from "@mui/material";


const Component = styled(Box)`
  height: 50%;
  width : 50%;
  background: #e9e9e9;
  margin: 100px 0px 0px 200px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding:15px;
  border-left: 2px solid grey; 
  border-bottom: 2px solid grey; 
  border-top: none; 
  border-right: none;
  border-radius: 25px; 
`
const Input = styled(Box)`
  margin: 30px;
`
const BoxInput = styled(TextField)`
  margin-left: 8px;
  height: 27px;
  width: 80%;
`

const Text = styled(Typography)`
font-weight:500;
color: #333333;
 margin: 10px;
 font-size: 22px;
`

const BButton = styled(Button)(({ theme }) => ({
  color: '#d3d3d3',
  background: '#2874f0',
  margin: '10px 6px 0 35px !important',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 3,
  padding: '9px 40px',
  height: 32,
  boxShadow: 'none',
  [theme.breakpoints.down('sm')]: {
      background: '#2874f0',
      color: '#FFFFFF'
  }
}));


export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); // synthetic event
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
      console.log(localStorage.getItem("authToken"))
    }
  };

  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
    <Navbar/>
      <Component>
        <FormLabel onSubmit={handleSubmit}>
          <Input>
            <Text >
              Email address
            </Text>
            <BoxInput
              type="email"
              value={credentials.email}
              name="email"
              onChange={onchange}
            />
          </Input>
          <Input>
            <Text>Password</Text>
            <BoxInput             
            type="password"
              name="password"
              value={credentials.password}
              onChange={onchange}/>
            </Input>

          <BButton type="submit">Submit</BButton>
          <Link to="/Signup">Don't have an account</Link>
        </FormLabel>
      </Component>
    </>
  );
}


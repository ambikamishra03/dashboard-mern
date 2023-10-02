import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import { Box , styled, Button , TextField, Typography } from "@mui/material";


const Component = styled(Box)`
  height: 65%;
  width : 50%;
  background: #e9e9e9;
  margin: 30px 0px 0px 220px;
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
const BoxInput = styled(TextField)`
  margin-left: 8px;
  height: 8%;
  width: 80%;
`
const Input = styled(Box)`
  margin: 18px;
`

const Text = styled(Typography)`
font-weight:500;
color: #333333;
margin: 8px;
font-size: 18px;
`


const BButton = styled(Button)(({ theme }) => ({
  color: '#d3d3d3',
  background: '#2874f0',
  margin: '10px !important',
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

export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    username: "",
    location: "",
    mobile: "",
    email: "",
    password: "",
    occupation: "",
  });
   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // synthetic event
    console.log(JSON.stringify({name:credentials.name,username:credentials.username,location:credentials.location,mobile:credentials.mobile,email:credentials.email,password:credentials.password,occupation:credentials.occupation}))
    const response = await fetch("http://localhost:5000/api/creatuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        username:credentials.username,
        location: credentials.location,
        mobile:credentials.mobile,
        email: credentials.email,
        password: credentials.password,
        occupation:credentials.occupation
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if(json.success){
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
      console.log(credentials);
    }
  };

  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
    <Navbar />
      <Component>
        <form onSubmit={handleSubmit}>
          <Input>
            <Text>Name</Text>
            <BoxInput
              type="text"
              name="name"
              value={credentials.name}
              onChange={onchange}
            />
          </Input>
          <Input>
            <Text>User Name</Text>
            <BoxInput
              type="text"
              name="username"
              value={credentials.username}
              onChange={onchange}
            />
          </Input>

          <Input>
            <Text>Email address</Text>
            <BoxInput
              type="email"
              value={credentials.email}
              name='email'
              onChange={onchange}
            />
          </Input>
          <Input>
            <Text>Password</Text>
            <BoxInput
              type="password"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </Input>
          <Input>
            <Text>Mobile Number</Text>
            <BoxInput
              type="text"
              name="mobile"
              value={credentials.mobile}
              onChange={onchange}
            />
          </Input>

          <Input>
            <Text>Occupation</Text>
            <BoxInput
              type="text"
              name="occupation"
              value={credentials.occupation}
              onChange={onchange}
            />
          </Input>

          <Input>
            <Text>Address</Text>
            <BoxInput
              type="text"
              name="location"
              value={credentials.location}
              onChange={onchange}
            />
          </Input>

          <BButton type="submit">Submit</BButton>
          <Link to="/login">Already a user</Link>
        </form>
      </Component>
    </>
  );
}

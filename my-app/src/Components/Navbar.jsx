import { Box , styled, Button} from "@mui/material";

import { useNavigate } from 'react-router-dom';

const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: '60px',
    width: '100%',
    justifyContent: 'space-between',
    overflowX: 'hidden',
    background: '#2874f0',
    [theme.breakpoints.down('lg')]: {
        margin: '0px !important'
    }
  }))

  const BButton = styled(Button)(({ theme }) => ({
    color: '#2874f0',
    background: '#FFFFFF',
    margin: '10px !important',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 3,
    padding: '5px 40px',
    height: 32,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
        background: '#2874f0',
        color: '#FFFFFF'
    }
  }));
  
  const Container = styled(Box)`
    display: flex;
    padding: 4px 10px;
`

const Profile = styled(Box)`
display: flex;
padding: 4px 10px;
margin-left: 15px;
`
const Image = styled('img')`
height: 50px;
width: 50px;
border-radius: 50%;
overflow: hidden;
`
const ProfileText = styled(Box)`
padding: 15px;
font-weight: 600;
font-size: 20px;
cursor: pointer;
color : #fff;
`



  

const Navbar = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogout =()=>{
      localStorage.removeItem("authToken");
      navigate("/login")
   }
   
    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the '/login' route
      };
      const handleClick = () => {
        navigate('/'); // Navigate to the '/login' route
      };

      const handleSignupClick = () => {
        navigate('/signup'); // Navigate to the '/signup' route
      };
        
    const logo = 'https://www.datwebdigital.com/DWD/wp-content/uploads/2012/06/logo-design.jpg';
  return (
    <Component>
      <Profile>
        <Image src={logo} alt="img" />
        <ProfileText onClick={handleClick}>Profile</ProfileText>
      </Profile>
      {(!localStorage.getItem("authToken"))?
      <Container>
        <BButton onClick={handleLoginClick}>Login</BButton>
        <BButton onClick={handleSignupClick}>Signup</BButton>
      </Container> :
      <BButton onClick={handleLogout}>Logout</BButton>
      }
    </Component>
  )
}

export default Navbar

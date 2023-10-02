import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const Container = styled(Box)`
  padding: 15px;
  width: 98%;
  height: 82vh;
  background: #d3d3d3;
`;
const Component = styled(Box)`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #a9a9a9;
`;

const Heading = styled(Typography)`
  padding: 5px 8px;
  font-size: 25px;
  font-weight: 600;
  color: #768072;
`;

const Details = styled(Box)`
  width: 55%;
  height: 340px;
  margin: 30px;
  align-items: center;
  justify-content: center;
  border-left: 2px solid grey;
  border-bottom: 2px solid grey;
  border-top: none;
  border-right: none;
  border-radius: 0 0 0 25px;
`;
const Text = styled(Typography)`
  padding: 3px;
  margin-left: 20px;
  font-size: 20px;
`;

const Image = styled('img')`
  width: 50vh;
  height: 70vh;
  margin-right: 50px;
  border-radius: 5;
`;

const Dashboard = ({ userData }) => {
  // Check if userData is defined before destructuring
  if (!userData) {
    // Handle the case where userData is undefined or null
    return (
      <Container>
        <Heading>Welcome</Heading>
        <Component>
          <Details>
            <Typography style={{ fontWeight: '600', fontSize: '20px', padding: '20px' }}>
              User Details
            </Typography>
            <Text>Name: N/A</Text>
            <Text>Username: N/A</Text>
            <Text>Mobile Number: N/A</Text>
            <Text>Email Address: N/A</Text>
            <Text>Occupation: N/A</Text>
            <Text>Address: N/A</Text>
          </Details>
          <Box>
            <Image
              src="https://p7.hiclipart.com/preview/480/141/157/kinh-doanh-business-accounting-computer-file-business-man.jpg"
              alt="welcome"
            />
          </Box>
        </Component>
      </Container>
    );
  }

  // Destructure userData if it's defined
  // const { name, username, mobile, email, occupation, address } = userData;
  const image =
    'https://p7.hiclipart.com/preview/480/141/157/kinh-doanh-business-accounting-computer-file-business-man.jpg';

  return (
    <Container>
      <Heading>Welcome, {userData.name}</Heading>
      <Component>
        <Details>
          <Typography style={{ fontWeight: '600', fontSize: '20px', padding: '20px' }}>
            User Details
          </Typography>
          <Text>Name: {userData.name}</Text>
          <Text>Username: {userData.username}</Text>
          <Text>Mobile Number: {userData.mobile}</Text>
          <Text>Email Address: {userData.email}</Text>
          <Text>Occupation: {userData.occupation}</Text>
          <Text>Address: {userData.address}</Text>
        </Details>
        <Box>
          <Image src={image} alt="welcome" />
        </Box>
      </Component>
    </Container>
  );
};

export default Dashboard;

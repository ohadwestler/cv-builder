'use client'
import { Box, Button, Container, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  const router = useRouter();

  const navigateToBuilder = () => {
    router.push('/build-cv'); // Replace with your CV builder page route
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90vh',
        backgroundColor: '#F7F7F7',
        color: '#3F3F3F',
        alignContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to CV Builder App!
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Create professional resumes, CV and bio-data online for free, in minutes. 
            Simply fill in your details and generate beautiful PDF and HTML resumes!
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={navigateToBuilder}
            sx={{
              mt: 3,
              py: 2,
              px: 4,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '30px'
            }}
          >
            Create your CV
          </Button>
          <Box sx={{ mt: 4 }}>
            <Alert severity="info">
              Please note: Due to high hosting costs, the CV creation functionality is currently only available in the local setup of the application. 
            </Alert>
            <Typography variant="h6" component="h3">
              Why use our CV Builder?
            </Typography>
            <Typography variant="body1" gutterBottom>
              Our CV builder helps you to create a personalised CV that highlights your skills, experience, and achievements. Our professional tips, templates, and example content will make your CV stand out for all the right reasons.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;

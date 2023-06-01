// AuthenticationForm.tsx
import { ThemeProvider, Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormEvent } from 'react';
import robotImg from '../assets/robot.jpg';


const theme = createTheme();

interface FormField {
  id: string;
  label: string;
  name: string;
  autoComplete: string;
  type?: string;
  autoFocus?: boolean;
}

interface AuthenticationFormProps {
  formTitle: string;
  formFields: FormField[];
  buttonText: string;
  altText: string;
  altLink: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error?: string | null;
  success?: string | null;
}

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({ formTitle, formFields, buttonText, altText, altLink, onSubmit, loading, error, success }) => (
  <ThemeProvider theme={theme}>
    <Grid container component="main" flex={1}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${robotImg.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t : any) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {formTitle}
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            {formFields.map((field, index) => (
              <TextField
                key={index}
                margin="normal"
                required
                fullWidth
                id={field.id}
                label={field.label}
                name={field.name}
                autoComplete={field.autoComplete}
                autoFocus={field.autoFocus}
                type={field.type}
              />
            ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : buttonText}
            </Button>
            <Grid container>
              <Grid item>
                <Link href={altLink} variant="body2">
                  {altText}
                </Link>
              </Grid>
            </Grid>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
);

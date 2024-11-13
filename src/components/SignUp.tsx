import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import { Google } from 'react-bootstrap-icons';
import { server_provider } from '../provider/requests/hitmydb';
import { signUpPath } from '../statics/urls';
import toast from 'react-hot-toast';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignUpCard({setOpens}) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    let loginvalidation = server_provider({ path: signUpPath, method: 'POST', body: JSON.stringify({ username: data.get('email'), password: data.get('password') }) });
    if (((await loginvalidation).status) === 200) {
      let responses = (await loginvalidation).data;
      switch (responses.status) {
        case 200:
          toast.success(responses.message);
          setOpens(true);
          break;
        default:
          toast.error(`${responses.message.split(' ')[0].toLowerCase() === 'duplicate'?"Username already exist try to Sign In":responses.message}`);
          break;
      }
    }
  };


  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };
  const [user, setUser] = React.useState("null");

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(`${result.user.email}`);
      let loginvalidation = server_provider({ path: signUpPath, method: 'POST', body: JSON.stringify({ username: result.user.email, password: "GOOGLE_PROVIDER" }) });
      if (((await loginvalidation).status) === 200) {
        let responses = (await loginvalidation).data;
        switch (responses.status) {
          case 200:
            toast.success(`you've registered as ${result.user.email}`);
            const storage = window.localStorage;
            storage.setItem("isLogin", "true");
            storage.setItem("userN", `${result.user.email}`);
            setOpens(true);
            break;
          default:
            toast.error(`${responses.message}`);
            break;
        }
      } else {
        toast.error("Connection error");
      }
    } catch (error) {
      toast.success(`${error}`)
    }
  };

  return (
    <Card variant="outlined" style={{
      zIndex: 1
    }} className='animate__animated animate__fadeInUp'>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        {/* <Sitemark /> */}
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            sx={{ ariaLabel: 'email' }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
          Sign up
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          I have an account?{' '}
          <span>
          <span
            onClick={() => setOpens(true)}
            style={{
                cursor:'pointer'
              }}
            >
              Sign in
            </span>
          </span>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={signUpWithGoogle}
          startIcon={<Google />}
        >
          Sign up with Google
        </Button>
      </Box>
    </Card>
  );
}
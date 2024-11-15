import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from '../../components/AppTheme';
import Content from '../../components/Content';
import SignInCard from '../../components/SignInCard';
import SignUpCard from '../../components/SignUp';

export default function SignInSide(props: { disableCustomTheme?: boolean }) {
  const [open, setOpen] = React.useState(true);
  return (
    <AppTheme {...props}>
      {/* <CssBaseline enableColorScheme /> */}
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(at 50% 50%, var(--secondary2), hsl(220, 30%, 5%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                background:
                  'radial-gradient(at 50% 50%, var(--secondary2), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}
        className='signing'
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <Content />
            {
              open?
              <SignInCard setOpens={setOpen}/>:<SignUpCard setOpens={setOpen}/>
            }
          </Stack>
        </Stack>
      </Stack>
    </AppTheme>
  );
}

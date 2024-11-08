import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import { BookmarkAdd } from '@mui/icons-material';


const items = [
  {
    icon: <BookmarkAdd sx={{ color: 'text.secondary' }} />,
    title: 'Always have your Watchlists',
    description:
      'Sign in to unlock a personalized movie experience. Save your Watchlists, get tailored recommendations, and pick up right where you left off. Stay in the loop with alerts for new releases and exclusive content, all designed to keep you connected to the movies you love!',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Access your content anywhere',
    description:
      'Access your favorite movies and shows anywhere, anytime. Sign in to save your content, sync your Watchlists, and enjoy a seamless viewing experience across all your devices!',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450, zIndex:1}}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        {/* <SitemarkIcon /> */}
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }} className='animate__animated animate__fadeInUp' style={{
              animationDuration:`${(index + 1)*1000}`
            }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} className='animate__animated animate__fadeInUp' style={{
              animationDuration:`${(index + 1)*1500}`
            }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}

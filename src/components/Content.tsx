import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
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
//   {
//     icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
//     title: 'Great user experience',
//     description:
//       'Integrate our product into your routine with an intuitive and easy-to-use interface.',
//   },
//   {
//     icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
//     title: 'Innovative functionality',
//     description:
//       'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
//   },
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
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}

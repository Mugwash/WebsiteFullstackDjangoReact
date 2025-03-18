import React from "react";
import { Card, CardContent, Typography, Box, styled } from "@mui/material";

const TextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  minHeight: '100px',
  overflow: 'auto',
  flexGrow: 1,
  flexShrink: 0,
  flexBasis: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

interface ProfileInfoProps {
  lastUpdated: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ lastUpdated }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2, width: '100%' }}>
      <CardContent sx={{ flex: 1, marginLeft: 2 }}>
        <Typography variant="h5" component="div" color="primary" sx={{ fontWeight: 'bold' }}>
          AI-Enhanced Git Profile Section
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Mugwash Git Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This section is powered by OpenAI's GPT-3 model. It generates a summary of the user's GitHub profile based on the user's repositories. The user's GitHub username is hardcoded in the component. The component fetches the user's repositories and commits using the GitHub API. The commits are then summarized using OpenAI's GPT-3 model. The summary is displayed in the card. The user's profile picture is displayed on the left side of the card. The component uses MUI components for styling.
        </Typography>
      </CardContent>
    </Card>
  );
};

//example of how to use the component
//<ProfileInfo lastUpdated="2022-01-01" />

export default ProfileInfo;

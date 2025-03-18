import React from "react";
import { Card, CardContent, Typography,CardMedia } from "@mui/material";
import profile_pic from '../images/profilepic.jpeg';
import { useMediaQuery, useTheme } from "@mui/material";

const ProfileInfo: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', padding: 2, width: '100%' }}>
      <CardMedia
        component="img"
        sx={{ width: 200, height: 200,borderColor:"primary", borderRadius: '50%', border: '5px solid #5570FB', marginBottom: isMobile ? 2 : 0 }}
        image={profile_pic}
        alt="Profile Picture"
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="div" color="primary" align="center" marginLeft={isMobile ? 0 : -22}>
          Jack Grime
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          I am a Senior Analyst specialising in Data and Software with 4+ years of experience in the IT industry. I am proficient in a variety of programming languages in which Python & C# are my strongest. I am also a certified Azure AI Associate (AI-102). Other certifications I've obtained include C# Foundations by Microsoft as well as Azure Fundamentals (AZ900) and Azure Data Fundamentals (DP900). I have also used a variety of tech stacks due to the variety of projects I've been involved in. The Technology I'm most familiar with is GIT, Bash, Django, Azure Cognitive services, OpenAI, PowerShell and Nagios.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;

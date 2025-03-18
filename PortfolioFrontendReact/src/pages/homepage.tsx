import React, { useEffect } from 'react'; 
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import RepoCard from '../components/repocard';
import ProfileInfo from '../components/ProfileInfo';
import axios from 'axios';
import GitInfo from '../components/GitInfo';
import img1 from '../images/cover1.jpg';
import img2 from '../images/cover2.jpg';
import img3 from '../images/cover3.jpg';
import img4 from '../images/cover4.jpeg';

const Homepage: React.FC = () => {
  interface Commit {
    sha: string;
    message: string;
    date: string;
    patch: string | null;
  }
  
  interface Repository {
    name: string;
    commits: Commit[];
    image?: string; // Optional because you'll add it dynamically
    last_updated?: string; // Optional because you'll add it dynamically
  }
  const [repoData, setRepoData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get<{ repositories: Repository[]; last_updated: string }>(
        'http://localhost:8000/git/get-repo-data/'
      );

      const images = [img1, img2, img3, img4];
      const { repositories, last_updated } = response.data;

      // Add images and last_updated dynamically
      const dataWithImages = repositories.map((repo: Repository, index: number) => ({
        ...repo,
        image: images[index % images.length],
        last_updated,
      }));

      setRepoData(dataWithImages);
    } catch (error) {
      setError(axios.isAxiosError(error) ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: '50px' }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', padding: '50px', backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Profile Info */}
        <Grid item xs={12}>
          <ProfileInfo />
        </Grid>

        {/* Git Info */}
        <Grid item xs={12}>
          <GitInfo lastUpdated={new Date().toLocaleString()} />
        </Grid>

        {/* Repo Cards */}
        <Grid container spacing={2} justifyContent="center">
          {repoData.map((repo, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              key={index} 
              display="flex" 
              justifyContent="center"
              sx={{ alignSelf: 'stretch' }} // Ensures uniform height
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                <RepoCard repo={repo} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
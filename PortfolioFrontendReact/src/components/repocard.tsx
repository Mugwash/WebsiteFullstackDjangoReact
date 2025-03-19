import React from "react"; 
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Button, Collapse, IconButtonProps, styled, IconButton, Box, CardMedia, Tooltip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Commit {
  sha: string;
  message: string;
  date: string;
  patch: string | null;
  ai_summary: string | null;
}

interface Repo {
  name: string;
  commits: Commit[];
  image: string;
  last_updated: string;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const user = 'Mugwash';

const TextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1),
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  minHeight: '100px',
  maxWidth: '100%', 
  overflowX: 'auto', // Ensures horizontal scrolling if needed
  wordBreak: 'break-word', // Wraps long words
  backgroundColor: theme.palette.background.default
}));

const customCodeStyle = {
  ...darcula,
  'pre[class*="language-"]': {
    ...darcula['pre[class*="language-"]'],
    background: 'transparent',
    color: '#ccc',
    overflowX: 'auto' as 'auto', // Ensures horizontal scrolling instead of overflowing
    whiteSpace: 'pre-wrap' as 'pre-wrap', // Allows wrapping if needed
    wordBreak: 'break-word' as 'break-word' // Ensures long words don't break the layout
  },
  'code[class*="language-"]': {
    ...darcula['code[class*="language-"]'],
    background: 'transparent',
    color: '#ccc',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  }
};

const CodeDisplay = ({ patchData }: { patchData: string }) => (
  <SyntaxHighlighter 
    language="diff" 
    style={customCodeStyle as any}
  >
    {patchData.replace(/\\n/g, '\n').replace(/\r\n/g, '\n')}
  </SyntaxHighlighter>
);

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RepositoryCard = ({ repo }: { repo: Repo }) => {
  const [expandedSection, setExpandedSection] = React.useState<number | null>(null);

  const handleExpandClick = (index: number) => {
    setExpandedSection((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%', 
        height: '100%', 
        borderRadius: '16px',
        p: { xs: 2, sm: 3 } 
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          alt="coverphoto"
          image={repo.image}
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            maxHeight: { xs: 150, sm: 200 }, 
            borderRadius: '16px',
            objectFit: 'cover'
          }}
        />
        <Typography
          variant="body2"
          color="primary"
          sx={{ 
            position: 'absolute', 
            bottom: 8, 
            right: 8, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            color: 'white', 
            padding: '2px 8px', 
            borderRadius: '4px'
          }}
        >
          Last updated: {repo.last_updated}
        </Typography>
      </Box>
      <CardContent>
        <Typography
          color="primary"
          variant="h5"
          component="div"
          gutterBottom
        >
          {repo.name}
        </Typography>
      
        <List>
          {repo.commits.map((commit, index) => (
            <React.Fragment key={commit.sha}>
              <ListItem alignItems="flex-start" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                width: '100%' 
              }}>
                <ListItemText
                  primary={
                    <Box sx={{ maxWidth: 300 }}> {/* Adjust width as needed */}
                      <Typography
                      variant="body1"
                      sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                    >
                      {commit.message}
                      </Typography>
                      </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {new Date(commit.date).toLocaleDateString()} | 
                        <Tooltip title={commit.sha} arrow>
                          <span style={{
                            textOverflow: 'ellipsis', 
                            overflow: 'hidden', 
                            whiteSpace: 'nowrap', 
                            maxWidth: '150px', 
                            display: 'inline-block'
                          }}>
                            SHA: {commit.sha}
                          </span>
                        </Tooltip>
                      </Typography>
                      <Collapse in={expandedSection === index} timeout="auto" unmountOnExit>
                        <TextBox sx={{ padding: 2 }}>
                          <CodeDisplay patchData={commit.patch || ''} />
                        </TextBox>
                        {commit.ai_summary && (
                          <Typography 
                            variant="body2" 
                            color="text.primary" 
                            sx={{ 
                              wordBreak: 'break-word', 
                              maxWidth: '100%', 
                              overflowWrap: 'break-word'
                            }}
                          >
                            AI Summary:
                            {commit.ai_summary.split('-').map((line, idx) => (
                              <React.Fragment key={idx}>
                                {line.trim() && <div>- {line.trim()}</div>}
                              </React.Fragment>
                            ))}
                          </Typography>
                        )}
                      </Collapse>
                    </>
                  }
                />
                {commit.ai_summary && (
                  <ExpandMore
                    expand={expandedSection === index}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expandedSection === index}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                )}
              </ListItem>
              {index < repo.commits.length - 1 && <Divider variant="middle" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
      <CardContent sx={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" href={`https://github.com/${user}/${repo.name}`} target="_blank">
          View Repository
        </Button>
      </CardContent>
    </Card>
  );
};

export default function App({ repo }: { repo: Repo }) {
  return (
    <Box sx={{ padding: "20px", maxWidth: "100vw" }}>
      <RepositoryCard repo={repo} />
    </Box>
  );
}


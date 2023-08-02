import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardMedia from '@mui/material/CardMedia';

const styles = {
  card: { width: 600 },
  media: { height: 500 },
};

export default function VideoViewer({ video }) {
    const mediaUrlMap = {
        "YouTube": `https://www.youtube.com/embed/${video.key}`,
        "Vimeo": ` https://vimeo.com/${video.key}`,
    }

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        title={
          <Typography variant="h5" component="p">
            {video.name}{" "}
          </Typography>
        }
      />
      <CardMedia component="iframe" src={mediaUrlMap[video.site]}/>
      <CardContent>
        <p>{video.type}</p>
        <p>{video.published_at}</p>
        </CardContent>
        
    </Card>
  );
}

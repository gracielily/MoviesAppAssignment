import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Chip, Typography } from "@mui/material";
const styles = {
  media: { height: 400 },
};

export default function VideoViewer({ video }) {
  const mediaUrlMap = {
    YouTube: `https://www.youtube.com/embed/${video.key}`,
    Vimeo: ` https://vimeo.com/${video.key}`,
  };

  return (
    <Card>
      <CardMedia
        component="iframe"
        src={mediaUrlMap[video.site]}
        sx={styles.media}
      />
      <CardContent>
      <Typography variant="p" component="p" sx={{mb: 1}}>
            {video.name}{" "} 
          </Typography>
          <Chip label={video.type}/> {" "}
      </CardContent>
    </Card>
  );
}

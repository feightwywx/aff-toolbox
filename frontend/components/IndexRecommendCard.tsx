import React from 'react';
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Button } from "./common";

export const IndexRecommendCard: React.FC<{
  title: string;
  desc: string;
  href: string;
}> = ({ title, desc, href }) => {
  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ minHeight: "3rem" }}>
          <Typography variant="body1">{desc}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button href={href} withLocale>
          尝试一下
        </Button>
      </CardActions>
    </Card>
  );
};

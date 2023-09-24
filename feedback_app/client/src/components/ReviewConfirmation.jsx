import { Box, Typography, Rating } from "@mui/material";
import { useState } from 'react';

export default function ReviewConfirmation({ rating }) {
    return (
        <Box sx={{ paddingTop: 15 }}>
      <Rating value={Math.floor(rating)} className="font-setting" sx={{fontSize: '60px'}} readOnly />
      <Typography sx={{marginBottom: 3}}>{rating} out of 5</Typography>
      <Typography>Your review has been submitted.</Typography>
      <Typography>
        Thank you for review on our product. Your opinion matters to us!
      </Typography>
    </Box>
    );
}
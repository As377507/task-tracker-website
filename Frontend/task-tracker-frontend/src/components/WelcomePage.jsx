import React from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import heroImage from "../assets/computer picture.jpg"; 
import Navbar from "./Navbar"; // ✅ Import Navbar

const WelcomePage = ({ setView, token, handleLogout }) => {
  return (
    <>
      <Box sx={{ backgroundColor: "#00aeffea", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Text Side */}
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "#000" }}>
                Welcome to Task Tracker:
                <br />
                Enhance Your Task Efficiency
              </Typography>

              <Typography mt={6} variant="h6">
                Build, Track, Succeed – Streamline your tasks and achieve your goals effectively.
              </Typography>
            </Grid>

            {/* Image Side */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={heroImage}
                alt="Task Efficiency"
                sx={{
                  width: "100%",
                  borderRadius: "30px",
                  boxShadow: 3,
                }}
              />
              <Box mt={2}>
                <Typography sx={{ backgroundColor: "#fff", borderRadius: 2, px: 2, py: 1, display: "inline-block", mr: 2 }}>
                  Be Better
                </Typography>
                <Typography sx={{ backgroundColor: "#fff", borderRadius: 2, px: 2, py: 1, display: "inline-block" }}>
                  Be Smarter
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default WelcomePage;

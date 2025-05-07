import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CommonButton from "../common/CommonButton";

const TopBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    navigate("/");
  };


  const handleNavigate=()=>{
    navigate("/conversations")
  }

  return (
    <>
      {user && (
        <AppBar
          position="static"
          sx={{
            backgroundColor: "lightblue",
            color: "#000",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CommonButton color="inherit" onClick={handleNavigate} buttonName={"Home"}/>
            </Box>
            <CommonButton color="inherit" onClick={handleLogout} buttonName={"Logout"}/>
           
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default TopBar;

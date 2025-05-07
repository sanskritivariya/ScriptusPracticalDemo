import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CommonButton from "../common/CommonButton";
import CommonTextField from "../common/CommonTextFeild";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/users", {
        params: {
          email: userData.email,
          password: userData.password,
        },
      });

      if (res.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        navigate("/conversations");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleChangeField = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgb(0, 97, 255)",
      }}
    >
      <form
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h4" align="center">
          Login
        </Typography>

        <CommonTextField
          labelName={"Email"}
          variant={"outlined"}
          name={"email"}
          value={userData?.email}
          handleChange={handleChangeField}
        />
        <CommonTextField
          labelName={"password"}
          variant={"outlined"}
          value={userData?.password}
          name={"password"}
          handleChange={handleChangeField}
        />

        <CommonButton
          type="submit"
          variant="contained"
          buttonName="Login"
          color="primary"
          onClick={handleClick}
          fullWidth={true}
        />
      </form>
    </Box>
  );
};

export default Login;

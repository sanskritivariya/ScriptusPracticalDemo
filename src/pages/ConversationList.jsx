import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import apiGet from "../services/commonApi";

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [drafts, setDrafts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    getConversations();
    const savedDrafts = JSON.parse(localStorage.getItem("drafts") || "{}");
    setDrafts(savedDrafts);
  }, []);

  const getConversations = async () => {
    try {
      const data = await apiGet("conversations");
      setConversations(data);
    } catch (err) {
      console.log("Failed to fetch conversations:", err);
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", background: "#d0e9eb" }}>
      <Typography variant="h5" mb={2}>
        Message List
      </Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <List>
          {conversations.map((item) => {
            const draftText = drafts[item.id];

            return (
              <ListItem
                key={item.id}
                onClick={() => navigate(`/conversations/${item.id}`)}
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "lightblue" },
                }}
              >
                <Avatar sx={{ mr: 2 }}>
                  {item.name?.[0]?.toUpperCase()}
                </Avatar>

                <ListItemText
                  primary={item.name}
                  secondary={
                    draftText
                      ? `Draft: ${draftText}`
                      : item.lastMessage
                      ? `Last message: ${item.lastMessage}`
                      : "No messages yet"
                  }
                  secondaryTypographyProps={{
                    color: draftText ? "primary" : "text.secondary",
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default ConversationList;

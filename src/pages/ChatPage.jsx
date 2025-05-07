import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  Paper,
  Button,
} from "@mui/material";
import apiGet from "../services/commonApi";

const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    } else {
      setCurrentUser(user);
      fetchMessages();
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [id]);

  const fetchMessages = async () => {
    try {
      const res = await apiGet("messages", { conversationId: id });
      setMessages(res);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !currentUser) return;

    const newMessage = {
      conversationId: id,
      text: message,
      timestamp: new Date().toISOString(),
      senderId: currentUser.id,
    };

    try {
      await axios.post("http://localhost:3000/messages", newMessage);
      setMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Chat</Typography>

        <List sx={{ maxHeight: 300, overflowY: "auto", my: 2 }}>
          {messages.length === 0 ? (
            <Typography align="center">No messages yet</Typography>
          ) : (
            messages.map((msg, i) => {
              const isSender = msg.senderId === currentUser?.id;
              return (
                <ListItem
                  key={i}
                  sx={{ justifyContent: isSender ? "flex-end" : "flex-start" }}
                >
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: isSender ? "#1976d2" : "#eee",
                      color: isSender ? "#fff" : "#000",
                      borderRadius: 2,
                      maxWidth: "70%",
                    }}
                  >
                    <Typography>{msg.text}</Typography>
                    <Typography variant="caption" sx={{ textAlign: "right", display: "block" }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })
          )}
        </List>

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatPage;

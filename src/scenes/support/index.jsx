import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, TextField, Button, Paper} from '@mui/material';
import { ThreeDot } from 'react-loading-indicators';
import { tokens } from '../../theme';
import Header from '../../Components/dashboardPages/Header';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import REACT_APP_GEMINI_API_KEY from '../../.env'
const API_KEY = REACT_APP_GEMINI_API_KEY;

const Support = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [messages, setMessages] = useState([
      {
        message: "Hello, I'm here to assist you today.",
        direction: "incoming",
        sentTime: "just now",
        sender: "ChatGPT",
      },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
  
    const handleSendRequest = async () => {
      const newMessage = {
        message: inputMessage,
        direction: 'outgoing',
        sender: "user",
      };
  
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setIsTyping(true);
      setInputMessage('');
  
      try {
        const response = await processMessageToChatGPT([...messages, newMessage]);
        //console.log('API response:', response);
  
        const content = response;
        if (content) {
          const chatGPTResponse = {
            message: content,
            direction: "incoming",
            sender: "ChatGPT",
          };
          setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
        } else {
          console.error("No valid content found in API response");
        }
      } catch (error) {
        console.error("Error processing message:", error);
      } finally {
        setIsTyping(false);
      }
    };
  
    async function processMessageToChatGPT(chatMessages) {
      const apiMessages = chatMessages.map((messageObject) => {
        const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
        return { role, content: messageObject.message };
      });
  
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
          API_KEY
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: inputMessage }] }],
        },
      });
  
      return response["data"]["candidates"][0]["content"]["parts"][0]["text"];
    }
  
    return (
      <Box p="20px" >
        <Header title="Support" subtitle={"We are here to assist you"} />
        <Paper style={{ padding: '1rem', marginBottom: '1rem',backgroundColor:colors.primary[400] }}>
          <Box style={{ height: '77vh', overflowY: 'auto', marginBottom: '1rem', padding: '1rem', border: '1px solid #5EBF6D', borderRadius: '4px' }}>
            {messages.map((message, index) => (
              <Box key={index} style={{ marginBottom: '1rem', textAlign: message.direction === 'outgoing' ? 'right' : 'left' }}>
                {message.direction === 'outgoing' ? (
                                <Typography variant="body1" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#1976d2', color: '#fff', borderRadius: '50px' }}>
                                    {message.message}
                                </Typography>
                            ) : (
                                <Box style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#eee', color: '#000', borderRadius: '50px' }}>
                                    <ReactMarkdown>{message.message}</ReactMarkdown>
                                </Box>
                            )}
              </Box>
            ))}
            {isTyping && <ThreeDot variant="bob" color="secondary" size="small" text="" />}
          </Box>
          <Box display="flex">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendRequest();
                }
              }}
            />
            <Button sx={{ml:2}} variant="contained" color="secondary" onClick={handleSendRequest} disabled={isTyping || !inputMessage}>
              Send
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  };

export default Support;
//https://www.youtube.com/watch?v=XfIxonmx0_0
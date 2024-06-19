import { Box, useTheme, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Header from "../../Components/dashboardPages/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await import('./faqs.json');
        setFaqList(response.default);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <Box 
      m="20px" 
      height="100vh" 
      overflowy="auto"
    >
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      {faqList.map((faq, index) => (
        <Accordion key={index} sx={{ backgroundColor: colors.blueAccent[900], mb: "10px" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;

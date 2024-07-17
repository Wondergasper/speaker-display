const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route to fetch and display speaker data
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://web3lagosbackend.onrender.com/api/speaker-registrations/');
    const speakers = response.data;
    res.render('speakers', { speakers });
  } catch (error) {
    console.error('Error fetching speaker data:', error);
    let errorMessage = 'Unable to fetch speaker data. Please try again later.';
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      
      if (error.response.status === 404) {
        errorMessage = 'The speaker data endpoint was not found. Please check the API URL.';
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
      errorMessage = 'No response received from the server. Please try again later.';
    }
    
    res.status(500).render('error', { message: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
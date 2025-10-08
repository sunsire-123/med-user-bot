import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Loads .env automatically
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import the Gemini library

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// --- Initialize Gemini Client ---
// Make sure your .env file has GOOGLE_API_KEY=...
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  // We are using a popular and fast Gemini model
  model: "gemini-2.5-flash",
  // The system instruction tells the model how to behave
  systemInstruction: "You are a helpful medical assistant.",
});

// Define the /chat API endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  try {
    console.log(`--- Received message: ${message} ---`);
    
    // --- Make the API call to Gemini ---
    const result = await model.generateContent(message);
    const response = await result.response;
    const aiMessage = response.text();

    console.log(`--- Gemini response: ${aiMessage} ---`);
    res.json({ response: aiMessage });

  } catch (error) {
    console.error('--- API Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
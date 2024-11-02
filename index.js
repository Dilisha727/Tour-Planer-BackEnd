// // index.js
// const express = require("express");
// const dotenv = require("dotenv");
// const axios = require("axios");

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Generate Travel Itinerary Route
// app.post("/generate-itinerary", async (req, res) => {
//   const { destinationCountry, budget, travelStyle, interests, accommodationType, transportationType, activityType, cuisineType, tripDuration, language } = req.body;

//   // Define the prompt
//   const prompt = `Generate a personalized travel itinerary for a trip to ${destinationCountry} with a budget of ${budget}. The traveler is interested in a ${travelStyle} vacation and enjoys ${interests}. They are looking for ${accommodationType} accommodations and prefer ${transportationType} transportation. The itinerary should include ${activityType} activities and ${cuisineType} dining options. Please provide a detailed itinerary with daily recommendations for ${tripDuration} days, including suggested destinations, activities, and dining options. The itinerary should be written in ${language}.`;

//   try {
//     console.log("========================================")
//     console.log("api key", process.env.CHATGPT_API_KEY)
//     console.log("========================================")

//     // Make a request to ChatGPT API
//     const response = await axios.post("https://api.openai.com/v1/chat/completions", {
//       model: "gpt-4o",
//       messages: [{ role: "user", content: prompt }],
//     }, {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.CHATGPT_API_KEY}`,
//       },
//     });

//     res.json({ itinerary: response.data.choices[0].message.content });
//   } catch (error) {
//     console.error("Error generating itinerary:", error);
//     res.status(500).json({ error: "Failed to generate itinerary" });
//   }
// });

// // Lead Submission Route
// app.post("/submit-lead", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const response = await axios.post(process.env.ALTIGIC_LEAD_URL, { email });
//     res.json({ message: "Lead submitted successfully", data: response.data });
//   } catch (error) {
//     console.error("Error submitting lead:", error);
//     res.status(500).json({ error: "Failed to submit lead" });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

/*
*==============================================================================================================================
*/
const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const OpenAI = require("openai");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to generate a personalized travel itinerary
app.post("/generate-itinerary", async (req, res) => {
 // const { destinationCountry, budget, travelStyle, interests, accommodationType, transportationType, activityType, cuisineType, tripDuration, language } = req.body;

  console.log("========================================")
  console.log(req.body)
  console.log("========================================")

//const prompt = `Generate a personalized travel itinerary for a trip to ${destinationCountry} with a budget of ${budget}. The traveler is interested in a ${travelStyle} vacation and enjoys ${interests}. They are looking for ${accommodationType} accommodations and prefer ${transportationType} transportation. The itinerary should include ${activityType} activities and ${cuisineType} dining options. Please provide a detailed itinerary with daily recommendations for ${tripDuration} days, including suggested destinations, activities, and dining options. The itinerary should be written in ${language}.`;
//const prompt = `Generate a personalized travel itinerary for a trip to Milano, Italy with a budget of 250 USD. The traveler is interested in a Cultural vacation and enjoys History. They are looking for Hotel accommodations and prefer Bus transportation. The itinerary should include Outdoor activities and Traditional dining options. Please provide a detailed itinerary with daily recommendations for 3 days, including suggested destinations, activities, and dining options. The itinerary should be written in English. `

  try {
    //Make the request to OpenAI's Chat API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: req.body.prompt },
      ],
   });

    res.json(completion.choices[0].message.content );
//    res.json("Day 1:\n- Check into Hotel Berna, a 3-star hotel located in the heart of Milan, close to the Milano Centrale train station (cost: $80 per night)\n- Visit the iconic Milan Cathedral (Duomo di Milano) and take a guided tour to learn about its history and architecture\n- Explore the historic Sforza Castle, which houses several museums and art collections\n- Enjoy a traditional Italian dinner at Trattoria Torriani, known for its classic Milanese dishes such as osso buco and risotto alla Milanese\n\nDay 2:\n- Start the day with a visit to the Church of Santa Maria delle Grazie to see Leonardo da Vinci's famous painting, The Last Supper\n- Take a stroll through the Brera district, known for its charming streets, art galleries, and boutiques\n- Visit the Pinacoteca di Brera art gallery to see works by Italian masters such as Caravaggio and Raphael\n- Have lunch at Panzerotti Luini, a famous local spot for delicious fried pastries filled with cheese and tomato\n- Explore the vibrant Navigli district in the evening, known for its canals, trendy bars, and restaurants\n\nDay 3:\n- Visit the historic La Scala opera house and museum to learn about its prestigious history and see a collection of costumes and musical instruments\n- Take a bus to the picturesque town of Como, located on the shores of Lake Como, to enjoy a scenic boat ride and explore the charming town\n- Have a traditional Italian lunch at Trattoria Cavour 313, known for its homemade pasta dishes and fresh seafood\n- Spend the afternoon relaxing by the lake or exploring the local shops and boutiques\n- Return to Milan in the evening and have dinner at Trattoria del Nuovo Macello, a cozy restaurant serving traditional Lombard cuisine\n\nTotal cost for 3-day trip: $240 (hotel accommodations, meals, transportation)\nNote: Prices are approximate and may vary based on the season and availability."
// );
  } catch (error) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

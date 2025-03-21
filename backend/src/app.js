const express = require('express'); 
const aiRoutes = require('./routes/routes');
const cors = require('cors');

const app = express();

app.use(cors());  // Enable CORS for all routes


app.use(express.json()); 
// AI Routes
app.use("/ai", aiRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send("Hello World!");
});



module.exports = app;

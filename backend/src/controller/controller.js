const aiService = require('../services/services.js');


module.exports.getReview = async (req, res) => {
    // console.log("Received Request Body:", req.body); 

    const code = req.body.code;

    if (!code) {
        return res.status(400).json({ message: 'Prompt is required.' });
    }

    const response = await aiService(code);
    res.send(response);
};
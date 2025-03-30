const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.supabaseAnonKey);

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data?.user) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        req.user = data.user; 
        next();
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = verifyUser;

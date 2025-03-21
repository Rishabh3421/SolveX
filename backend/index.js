require('dotenv').config();
const app = require('./src/app');


const port = process.env.PORT || 3000;

app.get("/", function(req, res){
    res.send("Hello World!");
});

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

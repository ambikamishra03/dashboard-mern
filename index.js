const express = require('express');
var cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;
const mongoDB= require('./database/db');

mongoDB();

app.use(express.json());
app.use('/api/', require('./routes/Createuser'));

if (process.env.NODE_ENV === 'production') 
 {
    //Set static folder up in production
    app.use(express.static('frontend/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html')));
  }


app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
});
const express = require('express');
var cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;
const mongoDB= require('./database/db');

mongoDB();

app.use(express.json());
app.use('/api/', require('./routes/Createuser'));

if (process.env.NODE_ENV === 'production') 
 {
    app.use(express.static('my-app/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'my-app', 'build','index.html')));
  }


app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
});
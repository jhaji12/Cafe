const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');
const Menu = require('./data/menu');
const menuRoute = require('./routes/menuRoute');
const authRoute = require('./routes/authRoute');
const cookieParser =require('cookie-parser');
const {requireAuth, currentUser} = require('./Middleware/authmiddleware');



dotenv.config();

connectDB()
const app = express();
app.use(express.static('public'));
app.use(express.json());

app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render('home');
});
// app.get('*', currentUser);
// app.get('/profile', requireAuth, (req,res) => {
//     res.render('profile');
// });
app.use(authRoute);

app.use('api/menu',menuRoute);

app.get('/menu', (req,res) => {
    res.json(Menu);
})

PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));
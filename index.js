import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import adminRoute from './routes/adminRoute.js'
import coursesRoute from './routes/courses.js'

const app = express();
dotenv.config();


app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/users', userRoutes);
app.use('/admin', adminRoute);
app.use('/courses', coursesRoute);



app.get('/', (req, res) => {
    res.send('Курсова');
});


const PORT = 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));



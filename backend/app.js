const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const taskRoute = require('./routs/taskRout');
app.use('/api/tasks', taskRoute);

// DB Connection
mongoose.connect(process.env.DATABASE_CONNECTION)
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => console.log("DB Connection Error:", error));

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const dotenv = require('dotenv');

const verify = require('./src/middlewares/auth-token');

dotenv.config()

const app = express();

requireDir('./src/model');

const routes = require('./src/routes')

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json());
app.use(cors());

app.use('/', routes.userRoutes);
app.use('/todos', verify ,routes.todosRoutes);

app.listen(3000)
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port') || 3000;

app.use('/api/auth', require('./routes/auth.routes'));

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => console.log(`app has been started on port ${PORT}`));
  } catch (error) {
    console.log('Server Error', error.message);
    process.exit(1);
  }
}



start();

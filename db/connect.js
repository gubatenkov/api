const mongoose = require('mongoose');

const connectDB = async (uri) => {
  const connect = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  console.log(`Connection to MongoDB created: ${connect.connection.host}`);
};

module.exports = connectDB;

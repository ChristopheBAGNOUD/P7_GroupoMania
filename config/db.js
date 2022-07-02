const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Christophe33:christophe@cluster0.l5orv.mongodb.net/Groupomania",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

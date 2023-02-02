const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
 /*.then(() => {
    console.log(data[0].title);
    return Recipe.create(data[0]);
  })*/
  .then(() => {
      for (let i = 0; i < data.length; i++) {
      console.log(data[i].title)
    };
    return Recipe.insertMany(data);
  })
  .then(() => {
    console.log("Success!");
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })
  .then(() => {
    console.log("Success for deleting a recipe!");
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  /*.then(() => {
    console.log("Connection is closed!");
    mongoose.connection.close()
  })*/
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close()





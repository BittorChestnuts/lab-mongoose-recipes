const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://victorcastanos:12345@cluster0.mr2s8vc.mongodb.net/';

let huevoFrito = {
  title: "Huevo Frito",
  level: "Easy Peasy",
  ingredients: ["Huevo", "Aceite", "fuego"],
  cuisine: "de toda la vida",
  dishType: "main_course",
  image: "https://imag.bonviveur.com/huevo-frito.jpg",
  duration: 10 ,
  creator: "Victor",
  created: ""
}
const multipleRecipes = require("./data.json")


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Iteration 2
    return Recipe.create(huevoFrito)
    //console.log(huevoFrito.title)
  })

  .then(() => {
    // Iteration 3
    return Recipe.create(multipleRecipes)
    
  })
  .then(() => {
    // Iteration 4
    return Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100 },
      {new: true}
    ) 
  })
  .then((myfuckingditto)=>{
    console.log(`the new duration of Rigattoni is: ${myfuckingditto.duration}` );
  })

.then(() =>{
  return Recipe.deleteOne(
    {title: "Carrot Cake"}
  )
  .then((ditto) =>{
    console.log("Carrot Cake removed");
  })
})

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .finally(() => {
    mongoose.connection.close();
  })  
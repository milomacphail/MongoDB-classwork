const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://milomacphail:Pandahead7!@cluster0-xmzff.gcp.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => console.log("Connected"))
    .catch(err => console.error("Couldn't connect", err));


const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .select('name');
  console.log(courses);
}

createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', 'authorId')

// listCourses();
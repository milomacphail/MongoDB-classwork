const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MiloMacPhail:careerDev5!@cluster0-uefxk.mongodb.net/test?retryWrites=true&w=majority')
.then(() => console.log("Connected"))
.catch(err => console.error("Couldn't connect", err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){

const course = new Course({
   name: "Angular Course",
   author: "Milo",
   tags: ['angular', 'front-end'],
   isPublished: true
});

const result = await course.save();
console.log(result);
}

async function getCourse(){

   const courses =  await Course
    .find({ author: 'Milo', isPublished: true })
    .limit(10)
    .sort({ name: 1  })
    .count();
    console.log(courses);
}

getCourse();


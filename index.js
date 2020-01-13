const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://milomacphail:Pandahead7!@cluster0-xmzff.gcp.mongodb.net/test?retryWrites=true&w=majority')
.then(() => console.log('Connected to MoongoDB'))
.catch(err => console.error("Couldn't connect."));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        author: "Milo",
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result); 
}

async function getCourses(){



    const courses = await Course
    .find({ author: "Milo", isPublished: true})
    .limit(10)
    .sort({name: 1})
    .select({ name: 1, tags: 1});
    console.log(courses);
}

getCourses();

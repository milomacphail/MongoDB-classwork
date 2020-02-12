const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'both'],
        lowercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: "A course needs at least one tag."
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {

    const course = new Course({
        name: "Angular Course",
        category: 'Web',
        author: "Milo",
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    });

    try {
        await course.validate();
    }
    catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
    const result = await course.save();
    console.log(result);
}


async function getCourses() {

    const courses = await Course
        .find({ _id: '5e1ca10effd1520c286aada3' })
        .limit(10)
        .sort({ name: 1 })
        .count();
    console.log(courses[0].price);
}

async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, { new: true });
    console.log(course);

    async function removeCourse(id) {
        const course = await Course.findByIdAndRemove(id);
        console.log(course);
    }

}
    createCourse();

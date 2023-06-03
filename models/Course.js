import mongoose from "mongoose";

const schema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please Enter course title"],
        minLength: [4, "Title must be at Least 4 Character"],
        maxLength: [80, "Title can't exceed 80 Character"],
    },
    description: {
        type: String,
        required: [true, "Please Enter course title"],
        minLength: [20, "description must be at Least 20 Character"],

    },

    lectures: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            video: {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        }
    ],
    poster: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    views: {
        type: Number,
        default: 0,
    },
    numOfVideos: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: [true, "Please Enter course Creator Name"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


export const Course = mongoose.model("Course", schema)
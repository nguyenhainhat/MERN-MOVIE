const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    comment: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
    admin: {
        type: Boolean,
        default: false
    }
},
    {timestamps: true}
);

const userCommentMovieSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
    },
    tv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tv",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comment: {
        type: String
    }

},
    {timestamps: true}
)

const User = mongoose.model("User", userSchema)
const UserCommentMovie = mongoose.model("UserCommentMovie", userCommentMovieSchema)

module.exports = {User, UserCommentMovie}
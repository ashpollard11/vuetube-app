const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const CatgorySchema = new Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Title must be at least three characters long'],
      trim: true,
      unique: true,
      uniqueCaseInsensitive: true,
      required: [true, 'Title is required']
    },
    description: {
      type: String,
      minlength: [3, 'Description must be at least three characters long'],
      required: [true, 'Description is required']
    }
  }, {timestamps: true}
)

CatgorySchema.plugin(uniqueValidator, {message: '{PATH} already exists.'})

module.exports = mongoose.model('Category', CatgorySchema)

const { model, Schema } = require('mongoose')

const Create = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  categories: [{
    name: {
      type: String,
    },
    capacity: {
      type: Number,
    },
    value: {
      type: Number,
    },
    events: [{
      type: {
        type: String,
      },
      amount: {
        type: Number,
      },
      date: {
        type: Number
      }
    }]
  }],
})

module.exports = model( 'user', Create )
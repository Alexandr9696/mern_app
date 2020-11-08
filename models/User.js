const {Schema, model} = require('mongoose')


const shema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  links: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Link'
    }
  ]
})

module.exports = model('User', shema)
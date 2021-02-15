const {Schema, model, ObjectId} = require('mongoose')

const User = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  diskSpace: {type: String, default: 1024**3*10},
  avatar: {type: String},
  files: [{type: ObjectId, ref: 'file'}]

})

module.exports = model('User', User)

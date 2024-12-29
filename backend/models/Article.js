const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  link:{type:String},
  place:{type:String,required:true},
  reporter:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Reporter'
  },
  approved:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model('Article', articleSchema);

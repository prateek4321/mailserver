import mongoose from "mongoose";
const EmailSchema = mongoose.Schema({
  to: {
    // all payload sent from frontend
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  subject: String, // can be empty also
  body: String,
  date: {
    type: Date,
    required: true, // it is neccessary
  },
  image: String,
  name: {
    type: String,
    required: true,
  },
  starred: {
    type: Boolean, // true or false
    required: true,
    default: false, // default value false i.e. in starting it is not starred by default
  },
  bin: {
    // deleated emails
    type: Boolean,
    required: true,
    default: false,
  },
  type: {
    // like sent
    type: String,
    required: true,
  },
});

const email = mongoose.model("emails", EmailSchema); // collection name has to be given in mongoose and we need to apply the validation above(so these are the two arguements)

export default email;

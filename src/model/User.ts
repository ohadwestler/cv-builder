import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    requeired: true,
  },
  lastname: {
    type: String,
    requeired: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 5,
  },
  cvs: {
    type: Array,
    required: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

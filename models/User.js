import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
export default User;

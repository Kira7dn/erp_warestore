import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
});

const User = models.User || model("User", UserSchema);

export default User;

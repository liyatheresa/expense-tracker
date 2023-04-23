import mongoose, { Schema } from "mongoose";

const mongoAtlasUri =
  "mongodb+srv://liyatheresa:FLWpIDCo1DFWUVz9@cluster0.vfpukqp.mongodb.net/?retryWrites=true&w=majority";
try {
  mongoose.connect(mongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.log("could not connect", e);
}
const UserSchema = new Schema({
  userDetails: {
    users: [{ id: String, name: String }],
    expenses: [{ id: String, type: String, amount: String, paidBy: String }],
  },
});
const User = mongoose.model("users", UserSchema);
User.createIndexes();

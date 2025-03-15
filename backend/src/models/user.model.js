import mongoose from "mongoose";

const userSchema = new mongoose.Schema (
    {
        email: {
            type: String,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            minLength: 6,
            maxLength: 100
        },
    },
    { timestamps : true },
);
const User = mongoose.model("User", userSchema);

export default User;


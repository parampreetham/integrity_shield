import mongoose from "mongoose";

const manufacturerSchema = new mongoose.Schema({
    mId: {
        type: String,
        required: [true, "Please provide a ID"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please provide a Phone Number"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const Manufacturer = mongoose.models.manufacturers || mongoose.model("manufacturers", manufacturerSchema);

export default Manufacturer;
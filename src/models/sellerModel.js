import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    mId: {
        type: String,
        required: [true, "Please provide a ID"],
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide a email"],
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please provide a Phone Number"],
    },
    brand:{
        type: String,
        required: [true, "Please provide a brand"],
    },
    manager:{
        type: String,
        required: [true, "Please provide a manager"],
    },
    sCode:{
        type: String,
        required: [true, "Please provide a Seller Code"],
        unique: true,
    },
    address:{
        type: String,
        required: [true, "Please provide a address"],
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

const Seller = mongoose.models.sellers || mongoose.model("sellers", sellerSchema);

export default Seller;
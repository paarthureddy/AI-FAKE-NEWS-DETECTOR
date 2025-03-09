import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    text: { type: String, required: true },
    url: { type: String, required: false },
    credibilityScore: { type: Number, required: true },
    analyzedAt: { type: Date, default: Date.now },
    reason: { type: String, required: false }, 
    reported: { type: Boolean, default: false } 
}, { timestamps: true });

const NewsModel = mongoose.model("NewsModel", NewsSchema);

export default NewsModel;
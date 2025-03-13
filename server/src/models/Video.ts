import mongoose, { Schema, Document } from "mongoose";

interface IVideo extends Document {
    imgUrl: string;
    videoUrl: string;
}

const videoSchema = new Schema<IVideo>(
    {
        imgUrl: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IVideo>("Video", videoSchema);

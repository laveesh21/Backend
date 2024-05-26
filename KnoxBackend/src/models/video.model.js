import {mongoose, Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v21"

const viderSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },

        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        duration:{
            type: Number,
            required: true
        },

        views:{
            type: Number,
            required: true
        },
        
        isPubished:{
            type: True,
            required: true
        },
        
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {timestamps: true}
)

viderSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", viderSchema)
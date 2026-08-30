import mongoose from "mongoose";
import crypto from "crypto";

const PostsSchema = new mongoose.Schema(
  {
    

    roomId: {
      type: String,
      required: true,
    },

    nameOrg: {
      type: String,
      required: true,
    },
    ownerId :{
      type:String,
    },

    posts_section: [
      {

        Time :{
          type :Date ,
          default:Date.now
        },
        id: {
          type: String,
          default: () => crypto.randomUUID(),
        },

        category: {
          type: String,
          trim: true,
        },

        categoryClass: {
          type: String,
          trim: true,
        },

        pinned: {
          type: Boolean,
          default: false,
        },

        score: {
          type: Number,
          default: 0,
        },

        title: {
          type: String,
          required: true,
          trim: true,
        },

        description: {
          type: String,
          required: true,
          trim: true,
        },

        author: {
          type: String,
          required: true,
          trim: true,
        },

        time: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          default: null,
        },

        comments: {
          type: Number,
          default: 0,
        },
        
      },
      
    ],
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("posts", PostsSchema);

export default Posts;

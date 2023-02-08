// ---- Pour définir le model de nos Post ----

import mongoose from "mongoose";
import { PostType } from "../../types/post.type";

const Post = new mongoose.Schema<PostType>({
    name:{ type: 'string',required: true},
    prompt:{ type: 'string',required: true},
    photo:{ type: 'string',required: true}
});

const PostSchema = mongoose.model('Post',Post);
export default PostSchema;
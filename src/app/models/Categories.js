import mongoose from "mongoose";

const {Schema, model} = mongoose;

const CategorieSchema = new Schema({
     name: {type: String, required: true,},
     
},{timestamps: true})


export default mongoose.models.Categorie || model("Categorie", CategorieSchema);
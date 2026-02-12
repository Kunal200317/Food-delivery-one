import mongoose from "mongoose";

const {Schema,model} = mongoose 

const ExtraIngredientSchema = new Schema({
   name: String,
   price: Number,
})



const MenuItemsSchema = new Schema({
    name: {type: String, required: true,},
    description: {type: String, required: true,},
    price: {type: Number, required: true,},
    image: {type: String, required: true,},
    sizes: {type:[ExtraIngredientSchema]},
    extraingredients: {type:[ExtraIngredientSchema]},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }
   
   
},{timestamps: true});

export default mongoose.models.MenuItems || model("MenuItems", MenuItemsSchema);
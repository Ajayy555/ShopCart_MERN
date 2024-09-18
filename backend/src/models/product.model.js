import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
        brand:{
            type:String,
        },
        title:{
            type:String,
            requird:true,
        },
        cateogry:{
            type:String,
            enum:['electronics','men','women','pantry']
        },
        subCateogry:{
            type:String,
            enum:['mobiles','laptop','speaker','camera','footwear','clothing','grooming','watches','beauty','groceries']
        },
        price:{
            type:Number,
            required:true,

        },
        discount:{
            type:Number,
            default:0,
        },
        images:{
            type:[],
            requied:true,
        },
        barcode:{
            type:Number,
            requird:true
        },
        minOrderQty:{
            type:Number,
            default:0,
        },
        deliveryDate:{
            type:Date
        },
        stock:{
            type:Number,
        },
        ratings:{
            type:Number,
        },
        returnPolicy:
        {
            type:String,
            enum:['No Return Policy','7 Days','10 Days','14 Days'],
            default:'No Return Policy',
        },
        weight:{
            type:String
        }







},{timestamps:true})

export const Product=new mongoose.model("Product",productSchema);

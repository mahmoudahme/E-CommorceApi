import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short product title'],
        maxlength: [100, 'Too long product title'],
      },
      slug: {
        type: String,
        required: true,
        lowercase: true,
      },
      description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [20, 'Too short product description'],
      },
      quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
      },
      sold: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'Too long product price'],
      },
      imageCover: {
        type: String,
        required: [true, 'Product Image cover is required'],
      },
      images: [String],
      category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Product must be belong to category'],
      },
      brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
      },
    },
    {
      timestamps: true,
      // to enable virtual populate
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );
  
 export default mongoose.model('Product', productSchema);

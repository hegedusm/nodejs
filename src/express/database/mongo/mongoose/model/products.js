import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
	text: {type: String, required: true}
});

const productSchema = new mongoose.Schema({
	id: {type: Number, required: true},
	lastModifiedDate: Date,
	name: { type : String, required : true },
	reviews: [reviewSchema]
});

// Sets the lastModifiedDate parameter equal to the current time
productSchema.pre('save', function(next){
    const now = new Date();
    this.lastModifiedDate = now;
    if(!this.lastModifiedDate) {
        this.lastModifiedDate = now
    }
    next();
});

const Products = mongoose.model('products', productSchema);
export default Products;
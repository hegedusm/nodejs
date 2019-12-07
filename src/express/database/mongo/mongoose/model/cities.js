import mongoose from "mongoose";

const citiesSchema = new mongoose.Schema({
	name: {type: String, required: true},
	country: {type: String, required: true},
	capital: {type: Boolean, required: true},
	lastModifiedDate: Date,
	id: {type: Number, required: true},
	location: {
		lat: Number,
		long: Number
	}
});

// Sets the lastModifiedDate parameter equal to the current time
citiesSchema.pre('save', function(next){
    const now = new Date();
    this.lastModifiedDate = now;
    if(!this.lastModifiedDate) {
        this.lastModifiedDate = now
    }
    next();
});


const Cities = mongoose.model('cities', citiesSchema);
export default Cities;
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
	userName: { type : String, required : true },
	password: { type : String, required : true },
	lastModifiedDate: Date
});


// Sets the lastModifiedDate parameter equal to the current time
usersSchema.pre('save', function(next){
    const now = new Date();
    this.lastModifiedDate = now;
    if(!this.lastModifiedDate) {
        this.lastModifiedDate = now
    }
    next();
});

const Users = mongoose.model('users', usersSchema);
export default Users;
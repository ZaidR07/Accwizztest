import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const GroupSchema = new mongoose.Schema({
    Groupname: { type: String, },
    Groupcode: { type: String, },
    Parentgroup: { type: String, },
    Creator : {type : String, },
    
    

    
});


GroupSchema.plugin(mongooseSequence(mongoose), { inc_field: 'group_id' });

const GroupModel = mongoose.model("Group", GroupSchema, "GroupTable");


export { GroupModel };
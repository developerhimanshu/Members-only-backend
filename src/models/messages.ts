import mongoose, {Schema} from 'mongoose';

const messageSchmea = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    title:String,
    message:String,
}, {timestamps:true})

const Message = mongoose.model('Message', messageSchmea);

export default Message;
const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const calcSchema= new Schema({
    _id: Schema.Types.ObjectId,
    operand1:{
        type:String,
        required:true
    },
    operand2:{
        type:String,
        required:true
    },
    operator:{
        type: String,
        required: true
    },
    result:{
        type: String,
        required: true
    }
},{
    timestamps:true,

});

const Calculations=mongoose.model('Calculations',calcSchema);

module.exports=Calculations;


const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
      
    title:{
        type: String,
       
    },
    quizes: [{
        question: {
            type:String,
            
        }
        ,
        answer_choices: {
            type:Array,
            default:[] 
        }
        ,
        answer: {
            type:String,
            
        }
    }],
    
    
    
    
    dueDate: {
        type:Date
    },
    createAt:{
        type:Date,
        default: new Date
    },
    grade:{
        type:Number
    }

})

const Assignment = mongoose.model('Assignment', assignmentSchema)

module.exports = Assignment
const Assignment = require('../models/Assignment')



const AssignmentController = {

createAssignment : async(req,res)=>{
   
   
    try { 

       
        
        const newAssignment = await Assignment.create(req.body);
         
			     newAssignment.save()

                
                res.status(201).json(newAssignment );
        
    } catch (error) {
        res.status(409).json({ message: 'does not work' });
    }


},



getAllAssignments: async(req,res)=>{
  

    try {
        const postAssignment = await Assignment.find();
                
        res.status(200).json(postAssignment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


},


getAssignmentById: async(req,res)=>{

    const id  = req.params._id;

    try {
        const post = await Assignment.findById(id).exec();
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
},

deleteAssignment: async (req, res) => {

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) return res.status(404).send("Todo not found...");
  
  
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
  
    res.send(deletedAssignment);

   
},

deleteAssignments : async (req, res) => { 
    try {
       await Assignment.find().remove();
       res.status(200).json({message: "all Assignments are deleted"})
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
},

updateAssignment: async(req,res)=>{
 

    try {


         await Assignment.findOneAndUpdate(req.params.id,req.body).exec()

        return res.json({msg: "assignment edited"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
},

addQuestion : async (req, res) =>{
   
    
    try {
       

       const addedQuestion = await Assignment.findOneAndUpdate(

            req.params,
            { $push: { quizes: {$each: req.body.quizes}}},
            {safe: true, upsert: true, new : true},
            // function(err, model) {
            //     console.log(err);
            // }
        );


       
        
        res.status(200).json(addedQuestion);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 


    
}



}


module.exports = AssignmentController
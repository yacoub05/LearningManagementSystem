

import React, { useState,useEffect } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

import {Avatar, Grid, ListItemIcon, Paper, Typography} from '@material-ui/core'

import { useDispatch, useSelector } from "react-redux";
import { createAssignment } from "../redux/assignment/assignmentAction";
// import Loading from "../../components/Loading";
// import ErrorMessage from "../../components/ErrorMessage";





const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

const CreateAssignment = ({history}) => {

    const classes = useStyles()
    const [title, setTitle] = useState("");



    const [quizes, setQuizes] = useState(
      [

        
      { id: uuidv4(), 
        question: '', 
        answer: '', 
        answer_choices:['']
      },

      ]
    );
  
  
    
  
    
   
    

  
    const dispatch = useDispatch();
  
    const assignmentCreate = useSelector((state) => state.assignmentCreate);
    const { loading, error, assignment } = assignmentCreate;
  
    console.log(assignment);

    const resetHandler = () => {
      setTitle("");
      setQuizes({});
     
    };


    
      
      
    


  
  




    const handleChangeInput = (id, event, answerChoicesIndex) => {
      const newInputFields = quizes.map((i) => {
        if (id === i.id) {
          if (event.target.name === "choice") {
            i.answer_choices[answerChoicesIndex] = event.target.value;
          }
  
          i[event.target.name] = event.target.value;
        }
        return i;
      });
  
  
  
      setQuizes(newInputFields);
    };
  

     const handleAddFields = () => {
       
      
      setQuizes([...quizes, { id: uuidv4(),  question: '', answer: '' , answer_choices:['']}])
    }

    const handleAddChoices = (index) => {
      const values =[...quizes]
      values[index].answer_choices.push('')
     
     setQuizes(values)
   }


 
     

    const handleRemoveFields = id => {
      const values  = [...quizes];
      values.splice(values.findIndex(value => value.id === id), 1);
      setQuizes(values);
    }
  
    const handleRemoveChoice = (index,answerChoicesIndex) => {
      const values  = [...quizes];
      if(answerChoicesIndex>0){
        values[index].answer_choices.splice(answerChoicesIndex, 1);
        setQuizes(values);
      }

      setQuizes(values);
     

    }
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(createAssignment(title,quizes));
      if (!title) return;
  
      resetHandler();
      history.push("/assignment");
    };
  
    useEffect(() => {}, []);
  


    const paperStyle = {padding:20, width:1000, margin:'100px auto'}
    return (
        <Grid>
          <Paper elevation={5} style={paperStyle}>

          {console.log(quizes)}

          <Typography variant='h4'>Add an assignment</Typography>

            <form className={classes.root} onSubmit ={submitHandler}>
              <div>
                
              </div>
                <TextField 
                  type="title"
                  value={title}
                  placeholder="Enter title"
                  onChange={(e) => setTitle(e.target.value)} 
                  label='Title'
                  style={{marginTop:30}} 
                  variant='filled'
                  />
          
              { quizes.map((inputField, index) => (


                  <div key={inputField.id}>
                    <h2 style={{fontSize: '18px'}}>Question : {index+1}</h2>


                    <TextField
                      size='small'
                      name="question"
                      label="Question"
                      variant="filled"
                      value={inputField.question}
                      onChange={event => handleChangeInput(inputField.id, event)}
                    />
                   
                    <Grid  elevation={5}>


                    <Typography>please enter Correct answer</Typography>
                    <TextField
                      size='small'
                      name="answer"
                      label="Answer"
                      variant="filled"
                      value={inputField.answer}
                      onChange={event => handleChangeInput(inputField.id, event)}
                    />
       
                
                {inputField.answer_choices.map((choice, i)=>(
                    
                    <div key={i} style={{padding: '10px'}}>
                    
                      
                    <span style={{fontSize: '18px'}}>Choice : {i+1}</span>

                    <TextField
                      variant="outlined"
                      name="choice"
                      placeholder="Choices"
                      onChange={(e) => handleChangeInput(inputField.id, e, i)}
                      value={inputField.answer_choices[i]}
                    />

                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleRemoveChoice(index,i)}
                    >
                      Delete
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddChoices(index)
                      }
                    >
                      Add Choices
                    </Button>
                   

                  </div>

                  
                  
                  ))}
                    </Grid>
                    <IconButton disabled={quizes.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleAddFields}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  )) }
      

                  <Button
                  className={classes.button}

                  variant="contained" 
                  color="primary" 
                  type="submit"
                  // onClick={handleSubmit}
                  >Submit</Button>


            </form> 
            </Paper>
        </Grid>
    )
}

export default CreateAssignment

import React,{useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignmentAction, listAssignments } from "../redux/assignment/assignmentAction";
import { assignmentListReducer } from '../redux/assignment/assignmentReducer';
import AssignmentList from './AssignmentList';
import Dashboard from './Dashboard';


import {withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, Typography } from '@material-ui/core';

import { assign } from 'nodemailer/lib/shared';
import SingleAssignment from './SingleAssignment';




const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    body: {
      
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);



  const useStyles = makeStyles({
  
  
     
  
      tableContainer:{
          
          marginTop:30,
          marginLeft:250,
          width:800,
          overflowY: "auto",
          
      },
      
      table: {
        
        minWidth: 650,
      },
      tableCell: {
          
          
          width: 130,
          height: 40
        },
    });

    const ExpandableTableRow = ({ key, children, expandComponent, ...otherProps }) => {
      const [isExpanded, setIsExpanded] = useState(false);
    
      return (
        <>
          <TableRow {...otherProps}>
            <TableCell padding="checkbox">
              <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            {children}
          </TableRow>
          {isExpanded && (
            <TableRow>
              <TableCell padding="checkbox" />
              {expandComponent}
            </TableRow>
          )}
        </>
      );
    };
  




    function createData(Name, Type, Start, Due, Progress, Begin , Delete, id) {
      return { Name, Type, Start, Due, Progress, Begin, Delete, id };
    }
  


const Assignments = ({history}) => {
    const classes = useStyles();

  const dispatch = useDispatch();
  
 
  const assignmentList = useSelector((state) => state.assignmentList);
  const { loading, error, assignments } = assignmentList;  

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const assignmentDelete = useSelector((state) => state.assignmentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = assignmentDelete;

  useEffect(() => {
    dispatch(listAssignments());
    if (!userInfo) {
      history.push("/login");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
   ]);


   

      
        
        




  const deleteHandler = (id) => {
   
     console.log( dispatch(deleteAssignmentAction(id)));
    console.log('delete assignment with id of '+id)
  };

    return loading ? (
        <h1>Loading</h1>
    ) : loadingDelete? (
      <h1>Loading delete</h1>


    ) :error ? (
        <h1>{error}</h1>
    ) : errorDelete ?(
        <h1>error delete</h1>

    ):
    
    (
        <div>
            

          <Link to="/createassignment">
            <Button    variant='contained' size='small' style={{ marginLeft: 10, marginBottom: 6 }} >
              Create new Assignment
            </Button>
          </Link>
              <Typography align='center' style={{ marginTop:50 }} variant='h4'>Assignments</Typography>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell align="right" style={{ width: 150 }}>Name</StyledTableCell>
                    <StyledTableCell align="right" style={{ width: 150 }}>Type</StyledTableCell>
                    <StyledTableCell align="right" style={{ width: 150 }}>Start</StyledTableCell>
                    <StyledTableCell align="right" style={{ width: 150 }}>Due</StyledTableCell>
                    <StyledTableCell align="right" style={{ width: 150 }}>Progress</StyledTableCell>
                    </TableRow> 
                </TableHead>




                
                </Table> 


               

            <Table className={classes.table} size="small" aria-label="a dense table">
         
               <TableBody >

               { assignments && assignments.map((assignment, index) => (
                
               <ExpandableTableRow
               
             
                expandComponent= {<TableCell colSpan="5">
                  
                
                  
                  {/* <Button variant='contained' size='small'>{assignment._id}</Button> */}
                  <Button variant='contained' size='small' href={`/doNow/${assignment._id}`}>Start</Button>
                  <Button style={{marginLeft:10}}  key={assignment._id} variant='contained' size='small' onClick={() => deleteHandler(assignment._id)}>Delete</Button>

                
                
                </TableCell>}
                
               
               >
                 
              <StyledTableRow key={assignment._id}>

                
                
                <TableCell component="th" scope="row" style={{ width: 170 }}  >
                  {assignment.title}
                </TableCell>
                <TableCell align="right"    style={{ width: 150 }}>{'type'}</TableCell>
                <TableCell align="right"    style={{ width: 150 }}>{assignment.dueDate}</TableCell>
                <TableCell align="right"    style={{ width: 150 }}>{assignment.dueDate}</TableCell>
                <TableCell align="right"    style={{ width: 150 }}>{'completed'}</TableCell>
                
             </StyledTableRow>
             

        </ExpandableTableRow>

              
        

          
)) }       
    </TableBody>
           
                
  </Table>
 
</TableContainer>
  {/* <AssignmentList loadingDelete={loadingDelete} errorDelete={errorDelete} loading={loading} error={error} assignments={assignments} deleteHandler={deleteHandler}/>  */}
            
           

        

        </div>

    )

}

export default Assignments

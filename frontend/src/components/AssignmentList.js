import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignmentAction, listAssignments } from "../redux/assignment/assignmentAction";


import {withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button } from '@material-ui/core';
import { assignmentDeleteReducer } from '../redux/assignment/assignmentReducer';

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useStyles = makeStyles({


   

    tableContainer:{

        marginTop:6,
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
  
  function createData(Name, Type, Start, Due, Progress, Begin , Delete, id) {
    return { Name, Type, Start, Due, Progress, Begin, Delete, id };
  }

  
  



  const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
  
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



const AssignmentList = ({assignments, deleteHandler, error, loading, loadingDelete, errorDelete}) => {


    const classes = useStyles();


    const rows = 

      assignments.map(
        
        (assignment, key) => {

         key = assignment._id
          
         return createData( assignment.title, 'type' ,'start',assignment.dueDate, 'completed', ' Begin', 'Delete', assignment._id)
        
         } );



   

    
        
    return  (
    
        
          
        <TableContainer component={Paper} className={classes.tableContainer}>
        
        <Table className={classes.table} size="small" aria-label="a dense table">
        
          <TableBody>

            {loading && loadingDelete ? (<h1>loading</h1>):error && errorDelete ?(<h1>error</h1>):( rows.map((row) => (
                
               <ExpandableTableRow
               
              
                expandComponent= {<TableCell colSpan="5">
                  
                 
                  <Button variant='contained' size='small'>{row.id}</Button>
                  <Button href={`/doNow/${row.id}`}>Edit</Button>
                
                
                </TableCell>}
                
               
               >

              <StyledTableRow >

                
                
                <TableCell component="th" scope="row" style={{ width: 170 }}  >
                  {row.Name}
                </TableCell>
                <TableCell align="right"    style={{ width: 150 }}>{row.Type}</TableCell>
                <TableCell align="right"    style={{ width: 150 }}>{row.Start}</TableCell>
                <TableCell align="right"    style={{ width: 150 }}>{row.Due}</TableCell>
                <TableCell align="right"    style={{ width: 150 }}>{row.Progress}</TableCell>
                <Button variant='contained' size='small' onClick={() => deleteHandler(row.id)}>{row.Delete}</Button>


              </StyledTableRow>
              </ExpandableTableRow>
              
            )))}

          
                
          </TableBody>
          
                
        </Table>
      </TableContainer>
    )
}

export default AssignmentList

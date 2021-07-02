
import React,{useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAssignmentAction, listAssignments } from "../redux/assignment/assignmentAction";
import { assignmentReducer } from '../redux/assignment/assignmentReducer';
import axios from "axios";
import { useParams } from "react-router-dom";
import api from '../api/index';
import styled from 'styled-components'
import { Button } from '@material-ui/core';






const QuizWindow = styled.div`
    text-align: center;
    font-size: clamp(20px, 2.5vw, 24px);
    margin-top: 10vh;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 2em auto;
    @media screen and (min-width: 1180px) {
        width: 50%;
    }
`;

const Option = styled.button`
    display: block;
    border: 1px solid #616A94;
    border-radius: 15px;
    padding: 15px 30px;
    text-decoration: none;
    color: #616A94;
    background-color: #161A31;
    transition: 0.3s;
    font-size: 1em;
    outline: none;
    user-select: none;
    margin-top: 1em;
    cursor: pointer;
    
    @media screen and (min-width: 1180px) {
        &:hover {
            color: white;
            background-color: #616A94;
        }
    }
`;

const Question = styled.div`
    width: 70%;
    margin: 0 auto;
`;






const SingleAssignment = ({history}) => {
    const [quiz, setQuiz] = useState([]);
    const [number, setNumber] = useState(0);
    const [pts, setPts] = useState(0);

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    const pickAnswer = (e) => {

        let userAnswer = e.target.outerText;

        if (quiz[number].answer === userAnswer) setPts(pts + 1);
        setNumber(number + 1);
    }


    

    const dispatch = useDispatch();

    const singleAssignment = useSelector((state) => state.singleAssignment);
    const { loading, error, assignment } = singleAssignment; 
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


   
    const { id } = useParams();
     
    
    
    useEffect(() => {

        api.get(`/assignment/${id}`)
            .then(res => {
                setQuiz(res.data.quizes.map(item => (
                
                    {
            
                        question: item.question,
                        options: shuffle([...item.answer_choices, item.answer]),
                        answer: item.answer
                    }

                )));
            })
            .catch(err => console.error(err))

    }, []);
    
   

    
    
  


    


    return  (

        <QuizWindow>
            { quiz[number] &&

                <>
                    <Question dangerouslySetInnerHTML={{ __html: quiz[number].question }}></Question>

                    <Options>
                        {quiz[number].options.map((item, index) => (
                            <Option key={index} dangerouslySetInnerHTML={{ __html: item }} onClick={pickAnswer}></Option>
                        ))}
                    </Options>

                    <Button variant='outlined'>Next</Button>
                </>

            

            }
        
            
            {/* {
                number === 5 && <GameOver pts={pts} />
            } */}
        </QuizWindow>
    )
}

export default SingleAssignment

import {combineReducers} from 'redux'
import { 
    assignmentCreateReducer, 
    assignmentDeleteReducer, 
    assignmentListReducer, 
    assignmentUpdateReducer,
    assignmentReducer
 } from './assignment/assignmentReducer'
// import auth from './user/authReducer'
// import token from './user/tokenReducer'
import { reducer as reduxFormReducer } from 'redux-form';
import  {userLoginReducer,
        userRegisterReducer,
        userUpdateReducer} from './user/userReducer'

export default combineReducers({
    // auth,
    // token,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    assignmentList: assignmentListReducer,
    singleAssignment: assignmentReducer,
    assignmentCreate: assignmentCreateReducer,
    assignmentDelete: assignmentDeleteReducer,
    assignmentUpdate: assignmentUpdateReducer,
    form: reduxFormReducer

})
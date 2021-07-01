import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GradeIcon from '@material-ui/icons/Grade';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CreateIcon from '@material-ui/icons/Create';

export const SidebarData = [
    {
        title: 'Home',
        path:'/',
        icon:<HomeIcon/>,
        cName:'nav-text'
    },
    {
        title: 'Assignment',
        path:'/assignment',
        icon:<AssignmentIcon/>,
        cName:'nav-text'
    },
    {
        title: 'New assignment',
        path:'/createassignment',
        icon:<CreateIcon/>,
        cName:'nav-text'
    },
    {
        title: 'Grade',
        path:'/grades',
        icon:<GradeIcon/>,
        cName:'nav-text'
    },
    {
        title: 'Report',
        path:'/report',
        icon:<AssessmentIcon/>,
        cName:'nav-text'
    },
]
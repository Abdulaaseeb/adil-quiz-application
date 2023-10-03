import { BrowserRouter as Router , Routes , Route} from "react-router-dom"
import LoginFunc from "../admin_screens/login"
import SignUpFunc from "../admin_screens/signup"
import PageNFound from "../admin_screens/pageNfound"
import Protected from "../admin_screens/protected"
import AdminPannel from "../admin_screens/adminPannel"
import UserPannel from "../admin_screens/user"
import MainQuiz from "../admin_screens/mainQuiz"
export default function AppRouter(){
    return(
       <Router>
        <Routes>
            <Route path="login" element={<LoginFunc/>}/>
            <Route path="signup" element={<SignUpFunc/>}/>
            <Route path="user" element={<UserPannel/>}/>
            <Route path="/mainQuiz" element={<MainQuiz/>}/>
            <Route path="/" element={<Protected Screen = {AdminPannel}/>}/>
            <Route path="*" element={<PageNFound/>}/>
        </Routes>
       </Router>
    )
}
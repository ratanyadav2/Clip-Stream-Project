import { Link } from "react-router-dom";



export function VideoHome(){
    return(
        <div>
            <h3>Home Page  </h3>
            <Link to='/user-login' className="btn btn-primary mx-3">User Login</Link>
            <Link  to='/admin-login' className='btn btn-warning'>Admin Login</Link>
        </div>
    )
} 
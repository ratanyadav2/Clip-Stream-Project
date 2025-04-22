import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useCookies } from "react-cookie";

export function UserLogin(){

    let naviagte = useNavigate();
    
    const [,setCookies,]= useCookies(['userid']);
    const formik= useFormik({
        initialValues :{
            userid:'',
            password:''
        },
        onSubmit:(admin) =>{
            axios.get(`http://127.0.0.1:4040/users`)
            .then(response=>{
                var record = response.data.find((item:any)=> item.userid === admin.userid);
                if(record) {
                    if(record.password===admin.password){
                        setCookies('userid',admin.userid);
                        naviagte('/user-dash');
                    }else{
                        alert('Invalid Password');
                    }
                }else{
                    alert('Invalid User Id');
                }
            })
        }
    })

    return(
        <div>
            <h3>User Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="userid" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="password"/></dd>
                </dl>
                <button type="submit" className="btn btn-success mx-3">Login</button>
                <div className="my-2">
                <Link  to="/register-user" className="btn btn-warning">New User Register</Link>
                </div>
                
            </form>
        </div>
    ) 
}
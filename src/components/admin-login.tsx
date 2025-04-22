import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminLogin(){

    const [,setCookie,]= useCookies(['admin_id']);

    let navigate = useNavigate();
    
    const formik = useFormik({
        initialValues:{
            admin_id:'',
            password:''
        },
        onSubmit: (admin) => {
            axios.get(`http://127.0.0.1:4040/admin`)
            .then(response=>{
                var record = response.data.find((item:any) => item.admin_id.toLowerCase() ===admin.admin_id.toLowerCase());
                if(record){
                    if(record.password===admin.password){
                        setCookie('admin_id', admin.admin_id);
                        navigate('/admin-dash');
                    }else{
                        alert('Inavlid Password');
                    }
                } else{
                    alert('Invalid Admin Id');
                }
            })
        }
    })

    return(
        <div className=" w-50 p-4 container-fluid justify-content-center d-flex">
            <h5>Admin Login</h5><br/>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="admin_id" className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="password"  className="form-control"/></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Submit</button>
            </form>
        </div>
    )
}
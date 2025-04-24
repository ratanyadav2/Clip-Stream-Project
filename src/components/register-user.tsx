import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



export function RegisterUser() {

    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userid: '',
      username: '',
      password: '',
      email: ''
    },
    onSubmit: (values) => {
      axios.post('http://127.0.0.1:4040/register-user', values)
        .then(() => {
          console.log('Registered');
          alert('User Registered Successfully!');
          navigate('/user-login')
        
        })
        .catch(err => {
          console.error('Registration failed:', err);
        });
    }
  });

  return (
    <div className="d-flex justify-content-center p-4 text-white" style={{
            backgroundImage:"url('/public/registerbg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '2rem'
            }}>
      {/* <div><h3 style={{color:"white"}}>REGITRATION</h3></div> */}
      <div className="p-4 mt-4">
            <form onSubmit={formik.handleSubmit}>
                <dl>
                <dt>User Id</dt>
                <dd><input type="text" name="userid" onChange={formik.handleChange} value={formik.values.userid} className="form-control" /></dd>

                <dt>Name</dt>
                <dd><input type="text" name="username" onChange={formik.handleChange} value={formik.values.username} className="form-control" /></dd>

                <dt>Password</dt>
                <dd><input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} className="form-control" /></dd>

                <dt>Email</dt>
                <dd><input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} className="form-control" /></dd>
                </dl>

                <button type="submit" className="btn btn-warning mx-3">Submit</button>
                <Link to='/user-login' className="btn btn-danger">Cancel</Link>
            </form>
      </div>
    </div>
  );
}

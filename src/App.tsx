import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { VideoHome } from './components/video-home'
import { UserLogin } from './components/user-login'
import { RegisterUser } from './components/register-user'
import { UserDashboard } from './components/user-dash'
import { AdminLogin } from './components/admin-login'
import { AdminDashboard } from './components/admin-dash'
import { AdminAddVideo } from './components/admin-add-video'
import { AdminEditVideo } from './components/admin-edit-video'
import { AdminDeleteVideo } from './components/admin-delete-video'

function App() {
  return (
    <div className='container-fluid '>
      <BrowserRouter>
        <header>
        <h2 className="text-center my-4">
  <Link to="/" className="text-decoration-none">
    <span style={{
      background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "800",
      fontSize: "2.5rem",
      letterSpacing: "1.5px",
      textShadow: "2px 2px 6px rgba(0,0,0,0.3)"
    }}>
      🎥 Clip Stream
    </span>
  </Link>
</h2>


        </header>
        {/* <nav className='d-flex justify-content-between my-3'>
          <h2 className='text-primary '><Link to='/' className='text-decoration-none'>ClipStream</Link></h2>
          <div className="w-50">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search" /> <button className="bi bi-search btn btn-warning"></button>
                 </div>
            </div>
          <div><Link to="/register-user" className='text-decoration-none text-dark'>SignIn</Link></div>
        </nav> */}
        <section>
          <Routes>
            <Route path='/' element={<VideoHome/>}/>
            <Route path='/user-login' element={<UserLogin/>} />
            <Route path='/register-user' element={<RegisterUser/>} />
            <Route path='/user-dash' element={<UserDashboard/>} />
            <Route path='/admin-login' element={<AdminLogin/>} />
            <Route  path='/admin-dash' element={<AdminDashboard/>}/>
            <Route  path='/add-video' element={<AdminAddVideo/>}/>
            <Route  path='/edit-video/:id' element={<AdminEditVideo/>} />
            <Route path='/delete-video/:id' element={<AdminDeleteVideo/>} />
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  )
}

export default App

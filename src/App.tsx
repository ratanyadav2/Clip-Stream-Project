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
    <div className='container-fluid'>
      <BrowserRouter>
        <header>
          <h2 className='text-center'><Link to='/' className='btn btn-light'><span>Clip Stream</span></Link></h2>
        </header>
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

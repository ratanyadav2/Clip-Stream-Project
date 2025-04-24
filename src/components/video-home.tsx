import { Link } from "react-router-dom";


export function VideoHome() {
    return (
        <div className="video-home-bg d-flex flex-column justify-content-center align-items-center text-center" style={{
            backgroundImage: "url('/public/bgclip.avif')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '85vh',
            padding: '2rem'
        }}>

            <div>
                <Link to='/user-login' className="btn btn-primary mx-3">User Login</Link>
                <Link to='/admin-login' className="btn btn-warning mx-3">Admin Login</Link>
            </div>
        </div>
    );
}

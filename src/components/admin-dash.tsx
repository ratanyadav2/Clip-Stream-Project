import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";
import { VideoContract } from "../contracts/video-contract";
import axios from "axios";


export function AdminDashboard(){

    const [cookies, ,removeCookie]=useCookies(['admin_id']);
    const [videos, setVideo] = useState<VideoContract[]>();

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4040/videos`)
        .then(response=>{
                setVideo(response.data);
        })
    })

    function SignOut(){
        removeCookie('admin_id');
        navigate('/admin-login');
    }

    return(
        <div>
            <h3 className="d-flex  mt-4 justify-content-between"><span>Admin Dashboard</span><span>{cookies['admin_id']} </span><button onClick={SignOut} className="btn btn-danger">SignOut</button></h3>
            <div>
                <Link to='/add-video' className="btn btn-primary bi bi-camera-video" >Add Video</Link>
            </div>
            <table className="table table-hover caption-top">
                <caption>Uploaded Videos</caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            videos?.map(video =>
                                <tr key={video.video_id}>
                                    <td>{video.title}</td>  
                                    <td>
                                        <iframe src={video.url} width="300" height="200"></iframe>
                                    </td>  
                                    <td>
                                        <Link to={`/edit-video/${video.video_id}`} className="btn btn-warning bi bi-pen-fill mx-2"></Link>
                                        <Link to={`/delete-video/${video.video_id}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                    </td>
                                </tr>
                                )
                        }
                </tbody>
            </table>
        </div>
    )
}
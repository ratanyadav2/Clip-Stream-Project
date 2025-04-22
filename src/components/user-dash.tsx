import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import { VideoContract } from "../contracts/video-contract";
import axios from "axios";
import { addToSaveList } from "../slicer/video-slicer";
import { useDispatch} from "react-redux";
import store from "../store/store";

export function UserDashboard(){

    const [cookies, ,removeCookie]=useCookies(['userid']);
    const [videos, setVideo] = useState<VideoContract[]>();

    let navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4040/videos`)
        .then(response=>{
                setVideo(response.data);
        })
    })

    function SignOut(){
        removeCookie('userid');
        navigate('/admin-login');
    }

    function AddToWatchLaterClick(video:VideoContract){
        dispatch(addToSaveList(video));
        alert('Added to Your WatchLater List');
    }

    function ViewSavedList(){
        console.log(store.getState().videos);
    }

    return(
        <div>
            <h3 className="d-flex mt-4 justify-content-between"><span>{cookies['userid']}  <button className="bi bi-plus btn"  onClick={ViewSavedList} >My List</button> </span> <span>User Dash</span> <button onClick={SignOut} className="btn btn-link">  Signout</button> </h3>
            <div className="my-3 w-50">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search videos: Java, Aws, React" /> <button className="bi bi-search btn btn-warning"></button>
                 </div>
            </div>
            <section className="d-flex felx-wrap">
                {
                    videos?.map(video=>
                        <div className="card m-2 p-2" style={{width:'300px'}} key={video.video_id}>
                            <div className="card-header">
                                <iframe width="100%" height="200" src={video.url}></iframe>
                            </div>
                            <div className="card-body">
                                <div className="fw-bold">{video.title}</div>
                                <p>{video.description}</p>
                            </div>
                            <div className="card-footer">
                                <button className="btn bi bi-hand-thumbs-up">{video.likes}</button>
                                <button className="btn bi bi-hand-thumbs-down">{video.dislikes}</button>
                                <button className="btn bi bi-eye-fill">{video.views}</button>
                                <button className="btn bi bi-plus" onClick={()=>{AddToWatchLaterClick(video)}}>Watch Later</button>
                            </div>
                        </div>
                    )
                }
            </section>
        </div>
    )
}
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams, useNavigate } from "react-router-dom";

export function AdminDeleteVideo() {
    const [cookies] = useCookies(['title']);
    const params = useParams();
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://127.0.0.1:4040/delete-video/${params.id}`)
            .then(() => {
                alert('Video Deleted');
                navigate('/admin-dash');
            })
            .catch(err => {
                console.error('Delete failed:', err);
            });
    };

    return (
        <div className="my-4 p-4">
            
            <form onSubmit={handleDelete}>
                <dl>
                    <dt>Are you sure you want to delete <strong>{cookies['title']}</strong>?</dt>
                </dl>
                <button type="submit" className="btn btn-success mx-3">Yes</button>
                <Link to='/admin-dash' className="btn btn-warning">No</Link>
            </form>
        </div>
    );
}
 
// export function AdminDeleteVideo(){
//     return(
//         <div>
//             <h3>Delete Video</h3>
//         </div>
//     )
// }
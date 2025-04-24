import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { VideoContract } from "../contracts/video-contract"
import axios from "axios";
import { useFormik } from "formik";
import { CategoryContract } from "../contracts/categories-contract";

export function AdminEditVideo(){

    const [video,setVideo]= useState<VideoContract>();
    const [categories,setCategories] = useState<CategoryContract[]>();

    let params = useParams();
    let navigate =useNavigate();

    function LoadCategories(){
        axios.get(`http://127.0.0.1:4040/categories`)
        .then(response=>{
             response.data.unshift({category_id:-1, category_name:'Select Category'});
             setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
        axios.get(`http://127.0.0.1:4040/videos/${params.id}`)
        .then(response=>{
            setVideo(response.data);
        })
    },[])

    const formik = useFormik({
        initialValues : {
            video_id : video?.video_id,
            title: video?.title, 
            description: video?.description, 
            url: video?.url, 
            likes: video?.likes, 
            dislikes: video?.dislikes, 
            views : video?.views,
            category_id: video?.category_id
        },
        onSubmit: (video)=>{
            axios.put(`http://127.0.0.1:4040/edit-video/${params.id}`, video);
            navigate('/admin-dash');
        },
        enableReinitialize: true
    })
    return(
        <div>
            <h3 className="d-flex mt-4 mb-5 justify-content-center">Admin Edit Video</h3>
            <form onSubmit={formik.handleSubmit} >
                <dl className="row m-lg-4">
                    <dt className="col-3">Video Id</dt>
                    <dd className="col-9"><input value={formik.values.video_id} onChange={formik.handleChange} type="number" name="video_id" /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input type="text" value={formik.values.title} onChange={formik.handleChange} name="title"/></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9"><input type="text" value={formik.values.description} onChange={formik.handleChange} name="description" /></dd>
                    <dt className="col-3">URL</dt>
                    <dd className="col-9"><input type="text"  value={formik.values.url} onChange={formik.handleChange} name="url"/></dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input type="number" value={formik.values.likes} onChange={formik.handleChange} name="likes" /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input type="number" value={formik.values.dislikes} onChange={formik.handleChange} name="dislikes"/></dd>
                    <dt className="col-3">Views</dt>
                    <dd className="col-9"><input type="number" value={formik.values.views} onChange={formik.handleChange} name="views" /></dd>
                    <dt className="col-3">Category</dt>
                    <dd className="col-9">
                        <select name="category_id" value={formik.values.category_id} onChange={formik.handleChange} >
                            {
                                categories?.map(category=><option key={category.category_id} value={category.category_id}> { category.category_name}</option>)

                            }
                        </select>
                    </dd>
                </dl>
                <button type="submit" className="btn btn-success mx-lg-3">Save Video</button>
            </form>
            <Link to='/admin-dash' className="btn btn-warning mt-4">Cancel</Link>
        </div>
    )
}
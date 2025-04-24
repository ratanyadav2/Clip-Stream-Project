import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useFormik } from "formik";
import { CategoryContract } from "../contracts/categories-contract";

export function AdminAddVideo(){

    const [category, setCategory]= useState<CategoryContract[]>();

    let navigate= useNavigate();

    const formik = useFormik({
        initialValues:{
            video_id:0,
            title:'',
            description:'',
            url:'',
            likes:0,
            dislikes:0,
            views:0,
            category_id:0
        },
        onSubmit:(video)=>{
            console.log(`Ha`);
            axios.post(`http://127.0.0.1:4040/add-video`,video)
            alert('Video Added');
            navigate('/admin-dash')
        }
    })

    function LoadCategories(){
        axios.get(`http://127.0.0.1:4040/categories`).then(response=>{
            response.data.unshift({category_id:-1,category_name:'Select Category'});
            setCategory(response.data);
        }) 
    }
    
    useEffect(()=>{
        LoadCategories();
    },[])


    return(
        <div>
            <h3 className=" d-flex p-4 justify-content-center"> Add Videos </h3>
            <form onSubmit={formik.handleSubmit} >
            <dl className="row">
                <dt className="col-3">Video Id</dt>
                <dd className="col-9"><input onChange={formik.handleChange} type="number" name="video_id" /></dd>
                <dt className="col-3">Title</dt>
                <dd className="col-9"><input type="text" onChange={formik.handleChange} name="title"/></dd>
                <dt className="col-3">Description</dt>
                <dd className="col-9"><input type="text" onChange={formik.handleChange} name="description" /></dd>
                <dt className="col-3">URL</dt>
                <dd className="col-9"><input type="text"  onChange={formik.handleChange} name="url"/></dd>
                <dt className="col-3">Likes</dt>
                <dd className="col-9"><input type="number" onChange={formik.handleChange} name="likes" /></dd>
                <dt className="col-3">Dislikes</dt>
                <dd className="col-9"><input type="number" onChange={formik.handleChange} name="dislikes"/></dd>
                <dt className="col-3">Views</dt>
                <dd className="col-9"><input type="number" onChange={formik.handleChange} name="views" /></dd>
                <dt className="col-3">Category</dt>
                <dd className="col-9">
                    <select name="category_id" onChange={formik.handleChange} >
                        {
                            category?.map(category=><option key={category.category_id} value={category.category_id}>{category.category_name}</option>)
                        }
                    </select>
                </dd>
            </dl>
            <button type="submit" className="btn btn-primary">Add Video</button>
            </form>
            <Link to='/admin-dash' className="btn btn-link mt-4">Back to Dashboard</Link>
        </div>
    )
}
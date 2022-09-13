import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

function PostDetail() {
        const [ post, setPost] = useState({});
        const { id } = useParams();

        useEffect(() => {
            // fetch(`/posts/${id}`).then((r) =>  {
            //     r.json().then((post) =>
            //       setPost(post)
            //     );
               
            // });
            axios.get(`http://localhost:3001/posts/${id}`, {
              withCredentials: true,
            }).then(response => setPost(response.data))
          }, [id]);


        //   console.log(post)
        
        // const fetchPost = async () => {
        //     const res = await fetch(`/posts/${id}`)
        //     console.log(res)
        //     if (res.ok) {
        //         const postJSON = await res.json()
        //         setPost({data: postJSON, error: null, status: "resolved"})
        //         console.log("Success")
        //     } else {
        //         const postErr = await res.json()
        //         setPost({data: null, error: postErr, status: "rejected"})
        //         console.log("failed")
        //     }
        // }   

        

        // useEffect(() => {
        //     fetchPost()
        //         .catch(console.error)
        //   }, [id])

          if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error.error}</h2>;
  return (
    <div>
        <h2>{post.subject}</h2>
        <h2>{post.body}</h2>
    </div>
  )
}

export default PostDetail
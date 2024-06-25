import React, { useState ,useEffect} from 'react'
import axios from 'axios'

const Gallery = () => {
    const[name,setName]=useState("");
    const[about,setAbout]=useState("");
    const[imageurl,setImageurl]=useState("");
    const [datas,setDatas]=useState([]);
    const [id,setid]=useState(null);
    useEffect(()=>{
      const handleread=()=>{
        axios.get("http://localhost:3005/users")
        .then((res) => {
          setDatas(res.data);
        })
        .catch(()=>{console.log("error occuring in read")})
      }
      handleread()
    })

    const handleEdit = (userid)=>{
      setid(userid)
    }

    const handlePost =()=>{
        axios.post("http://localhost:3005/users",{name,about,imageurl}).then(()=>{
            alert("data saved successfully");
            setName("");
            setAbout("");
            setImageurl("")
        }).catch((e) => {console.log(e)})
    }
     const handleDelete=(id)=>{
          axios.delete('http://localhost:3005/users/${id}')
          .then(()=>{
            alert("Deleted Successfully");
          })
          .catch(()=>{
            alert("error");
          })
     }
  return (

    <div>
        
        <form action="">
          <label htmlFor="nameInpute">Name</label><input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} /><br/>
          <label htmlFor="nameInput">About</label><input type="about" value={about} onChange={(e)=>{setAbout(e.target.value)}} /><br/>
          <label htmlFor="nameInput">Imageurl</label><input type="imageurl" value={imageurl} onChange={(e)=>{setImageurl(e.target.value)}} /><br/>
          <button type ="button" class="btn btn-primary" onClick={handlePost}> Submit</button>
        </form>
        
      {
        datas.map((i)=>(
          <li key = {i.id}>
            Name:{i.name}
            <br/>
            About: {i.name}
            <br/>
            Image: <img src={i.imageurl} alt='no img'/>
            <button onClick={()=>handleEdit(i)}>Edit</button>
            <button onClick={handleDelete(i.id)}>Delete</button>
          </li>
        ))
      }
    </div>
  )
}

export default Gallery

import React ,{useState} from 'react';
import './Signup.css';
import axios from 'axios';

const Signup = () => {
 
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[pass,setPass]=useState("");
  const[search,setSearch]=useState("");
  const[ph,setPh]=useState("");
  const[datas,setDatas]=useState([]);
  const handlePost=()=>{
    axios.post("http://localhost:3005/users",{name,email,pass,ph}).then(()=>{
      alert("data saved successfully");
      setName("");
      setEmail("");
      setPass("");
      setPh("")
  }).catch((e) => {console.log(e)})
  }
  const handleGet=(search)=>{
      // search.preventDefault();
      axios.get("http://localhost:3005/users").then((res)=>{
        if(Array.isArray(res.data)){
          setDatas(res.data);
        }
      else{
        console.log("Data Not match")
      }
      }).catch(()=>{
        alert("can't Retrieve data");
      })
    
  }
  return (
    <main>
      <div className="container mt-5">
        <h2>Signup</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name1" className="form-label">Name</label>
            <input type="text" className="form-control" id="name1" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email1"value={email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder="name@example.com" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder="Minimum 5 characters" required  minLength={5}/>
          </div>
          <div className="mb-3">
            <label htmlFor="phoneno" className="form-label">Phone No</label>
            <input type="number" className="form-control" id="password" value={ph} onChange={(e)=>{setPh(e.target.value)}}placeholder="Enter Your Phone number" required  minLength={10} maxLength={10}/>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="3" placeholder="Enter your message" required></textarea>
          </div> */}
          <button type="submit" className="btn btn-primary" onClick={handlePost}>Submit</button>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or phone" />
          <button type="submit" className="btn btn-primary" onClick={()=>handleGet(search)}>View</button>
        </form>

        {
          datas.map((i)=>(
            <li key = {i.id}>
              Name: {i.name}
              <br/>
              Email: {i.email}
              <br/>
              Password: {i.pass}
              <br/>
              Phone Num: {i.ph}
            </li>
          ))
        }
      </div>
    </main>
  );
};

export default Signup;

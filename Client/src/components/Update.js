import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Link,useParams,useHistory} from 'react-router-dom'

function Update(props) {  
  const [goal, setgoal] = useState('')     
      const {id} = useParams()
      console.log(id)
      useEffect(() => {
        axios.get(`http://localhost:3001/update?id=${id}`).then((response)=>{
        setgoal(response.data[0].todo_name)
       })
      }, [])
   let history = useHistory()
   
    return (
        <>    
             <Link to="/"><h2>back to home</h2></Link>
              <div>
            <form onSubmit={props.updateItemHandler}>
              <input type="text" name="updategoal" onChange={(e)=>setgoal(e.target.value)} value={goal}  style={{padding:16,fontSize:20}} />
              <input type="hidden" name="id" value={id} />
              <button type="submit" >submit</button>
              </form>
             </div>
            
        </>
    )
}

export default Update

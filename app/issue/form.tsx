'use client'
import { useState } from "react";




export default function NForm(){

    const [Description, setDescription] = useState('');
    const [Title, setTitle] = useState('');
    const [Complaint, setComplaint] = useState('');
    
    async function createCase() {
        const response = await fetch('/api/user/case/create',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Description,
                Title,
                Complaint,
            }),
          });
          const data = await response.json()
    
          console.log(data);
    
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        //console.log('Phone No:', PhoneNo);
        console.log('Description:', Description);

        await createCase();
  
    };
      
    return (<>

    <h1>Create an issue</h1>
    <form onSubmit={handleSubmit}>

      <label>
      Complaint:
        <input
          className="text-black"
          type="text"
          value={Complaint}
          onChange={(event) => setComplaint(event.target.value)}
          placeholder="Enter your Complaint"
        />
      </label>
      <label>
      Description:
        <input
          className="text-black"
          type="text"
          value={Description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter your Description"
        />
      </label>
      <label>
        Title:
        <input
          className="text-black"
          type="text"
          value={Title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter your Title"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
    </>)
}

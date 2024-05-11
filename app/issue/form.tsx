'use client'
import { useState } from "react";




export default function NForm(){

    const [Description, setDescription] = useState('');
    const [Title, setTitle] = useState('');
    const [Hostel_Number, setHostel_Number] = useState('');
    const [Room_Number, setRoom_Number] = useState('');
    const [Complainant_Name, setComplainant_Name] = useState('');
    const [Phone_Number, setPhone_Number] = useState('');

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
                Hostel_Number,
                Room_Number,
                Complainant_Name,
                Phone_Number,
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
                Title:
                <input
                    className="text-black"
                    type="text"
                    value={Title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter your Title"
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
                Hostel_Number:
                <input
                    className="text-black"
                    type="text"
                    value={Hostel_Number}
                    onChange={(event) => setComplaint(event.target.value)}
                    placeholder="Enter your Hostel Number"
                />
            </label>

            <label>
                Room_Number:
                <input
                    className="text-black"
                    type="text"
                    value={Room_Number}
                    onChange={(event) => setComplaint(event.target.value)}
                    placeholder="Enter your Room_Number"
                />
            </label>

            <label>
                Complainant_Name:
                <input
                    className="text-black"
                    type="text"
                    value={Complainant_Name}
                    onChange={(event) => setComplaint(event.target.value)}
                    placeholder="Enter your Name"
                />
            </label>


            <label>
                Phone_Number:
                <input
                    className="text-black"
                    type="text"
                    value={Phone_Number}
                    onChange={(event) => setComplaint(event.target.value)}
                    placeholder="Enter your Phone Number"
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    </>)
}

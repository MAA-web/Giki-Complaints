'use client'
import { useState } from "react";




export default function NForm(){

    const [Description, setDescription] = useState('');
    const [Title, setTitle] = useState('');
    const [Hostel_Number, setHostel_Number] = useState('');
    const [Room_Number, setRoom_Number] = useState('');
    const [Complaintant_Name, setComplaintant_Name] = useState('');
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
                Hostel_Number,
                Room_Number,
                Complaintant_Name,
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

        <form onSubmit={handleSubmit} className="flex flex-col justify-between items-center gap-4 p-8 bg-black border-4 shadow-md rounded-md">
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
                    onChange={(event) => setHostel_Number(event.target.value)}
                    placeholder="Enter your Hostel Number"
                />
            </label>

            <label>
                Room_Number:
                <input
                    className="text-black"
                    type="text"
                    value={Room_Number}
                    onChange={(event) => setRoom_Number(event.target.value)}
                    placeholder="Enter your Room_Number"
                />
            </label>

            <label>
                Complainant_Name:
                <input
                    className="text-black"
                    type="text"
                    value={Complaintant_Name}
                    onChange={(event) => setComplaintant_Name(event.target.value)}
                    placeholder="Enter your Name"
                />
            </label>


            <label>
                Phone_Number:
                <input
                    className="text-black"
                    type="text"
                    value={Phone_Number}
                    onChange={(event) => setPhone_Number(event.target.value)}
                    placeholder="Enter your Phone Number"
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    </>)
}



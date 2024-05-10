import { useState } from "react";

export default function issue() {
    const [PhoneNo, setPhoneNo] = useState('');
    const [Description, setDescription] = useState('');
    const [Title, setTitle] = useState('');

    async function createCase(PhoneNo:string, Description:string) {
        const response = await fetch('/api/user/case/create',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PhoneNo,
                Description,
                Title,
            }),
          });
          const data = await response.json()
    
          console.log(data);
    
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log('Phone No:', PhoneNo);
        console.log('Description:', Description);

        await createCase(PhoneNo, Description);
  
    };
      
    return (<>

    <h1>Create an issue</h1>
    <form onSubmit={handleSubmit}>
      <label>
      Phone number:
        <input
          className="text-black"
          type="text"
          value={PhoneNo}
          onChange={(event) => setPhoneNo(event.target.value)}
          placeholder="Enter your Phone number"
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
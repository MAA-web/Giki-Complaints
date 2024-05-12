'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function onboarding() {
    const router = useRouter();

    const [Name, setName] = useState('');
    const [RoomNo, setRoomNo] = useState('');
    const [PhoneNo, setPhoneNo] = useState('');

    async function OnboardUser(Name: string) {
      const response = await fetch('/api/onboarding',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // TODO the goddamn names
          Name
        }),
      });
      const data = await response.json()

      console.log(data);
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      // Call API or perform action with hostelNo and RoomNo here
      // console.log('Hostel No:', hostelNo);
      // console.log('Room No:', RoomNo);
      await OnboardUser(Name);

      return router.push("/dashboard")
    };
    return (<>
    
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          className="text-black"
          type="text"
          value={Name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your hostel number"
        />
      </label>
      {/* <label>
        Room No:
        <input
          className="text-black"
          type="text"
          value={RoomNo}
          onChange={(event) => setRoomNo(event.target.value)}
          placeholder="Enter your room number"
        />
      </label>
      <label>
      Phone number:
        <input
          className="text-black"
          type="text"
          value={PhoneNo}
          onChange={(event) => setPhoneNo(event.target.value)}
          placeholder="Enter your Phone number"
        />
      </label> */}
      <button type="submit">Submit</button>
    </form>
    
    
    </>)

}
'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function onboarding() {
    const router = useRouter();

    const [hostelNo, setHostelNo] = useState('');
    const [RoomNo, setRoomNo] = useState('');

    async function OnboardUser(h_no: string, r_no: string) {
      const response = await fetch('/api/onboarding',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'hostelNo': h_no,
          'roomNo': r_no,
        }),
      });
      const data = await response.json()

      console.log(data);
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      // Call API or perform action with hostelNo and RoomNo here
      console.log('Hostel No:', hostelNo);
      console.log('Room No:', RoomNo);
      await OnboardUser(hostelNo, RoomNo);
      return router.push("/dashboard")
    };
    return (<>
    
    <form onSubmit={handleSubmit}>
      <label>
        Hostel No:
        <input
          className="text-black"
          type="text"
          value={hostelNo}
          onChange={(event) => setHostelNo(event.target.value)}
          placeholder="Enter your hostel number"
        />
      </label>
      <label>
        Room No:
        <input
          className="text-black"
          type="text"
          value={RoomNo}
          onChange={(event) => setRoomNo(event.target.value)}
          placeholder="Enter your room number"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
    
    
    
    
    </>)

}
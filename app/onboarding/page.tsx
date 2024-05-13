'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Onboarding() {
    const router = useRouter();

    const [name, setName] = useState('');
    // const [roomNo, setRoomNo] = useState('');
    // const [phoneNo, setPhoneNo] = useState('');

    async function onboardUser(name: string) {
      try {
        const response = await fetch('/api/onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name }),
        });
        const data = await response.json();
        console.log(data);
        router.push("/dashboard");
      } catch (error) {
        console.error("Error on onboarding:", error);
      }
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      onboardUser(name);
    };

    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Onboarding</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="roomNo" className="block text-sm font-semibold">Room No:</label>
            <input
              id="roomNo"
              type="text"
              value={roomNo}
              onChange={(event) => setRoomNo(event.target.value)}
              placeholder="Enter your room number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNo" className="block text-sm font-semibold">Phone Number:</label>
            <input
              id="phoneNo"
              type="text"
              value={phoneNo}
              onChange={(event) => setPhoneNo(event.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div> */}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
            Submit
          </button>

          <p>If you have already done this then no need just Submit something random</p>
        </form>
      </div>
    );
}

'use client'
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export default function YourCases() {
  const [data, setData] = useState([]);
  const [Sindh, setindex] = useState(-1);
  const [vvv, setvalue] = useState('');

  const getData = async () => {
    try {
      const response = await axios.post("/api/user/case/viewall");
      setData(response.data.dat.data);
      console.log(response.data.dat.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCardClick = (index:number, value:string) => {
    // Handle card selection or navigation here
    if (index === Sindh) {
      setindex(-1)
      setvalue('')
    }
    else{
      setindex(index)
      setvalue(value)
      console.log("Selected card index:", index);
      console.log("Selected card id:", value);
    }
  };
  const pensss = async () => {
    try {
      const response = await fetch("/api/user/case/pend", {
        method: 'POST',
        headers: {
          'Content-Type':'Application/json'
        },
        body: JSON.stringify({
          vvv
        })
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cases</h1>

      <Button variant="destructive" onClick={getData}>
        Update
      </Button>
      <br />
      <br />
      {data.length > 0 ? (<>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div key={index} className="cursor-pointer" onClick={() => handleCardClick(index, item.result.id)}>
              <div className={` rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out ${(item.result.status === 'pending') ? 'bg-red-400' : 'bg-white' } ${(item.result.status === 'success') ? 'bg-green-500' : 'bg-white' } ${(index === Sindh) ? 'bg-blue-400' : 'bg-white'}`}>
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2 text-neutral-900">{item.result.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">Description: {item.result.description}</p>
                  <p className="text-sm text-gray-600 mb-2">Hostel Number: {item.result.hostel_number}</p>
                  <p className="text-sm text-gray-600 mb-2">Room Number: {item.result.room_number}</p>
                  <p className="text-sm text-gray-600 mb-2">Complaintant Name: {item.result.complaintant_name}</p>
                  <p className="text-sm text-gray-600 mb-2">Status: {item.result.status}</p>
                  <p className="text-sm text-gray-600 mb-2">ID: {item.result.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      <br />

        <Button variant={"secondary"} onClick={pensss}>Pending</Button></>

      ) : (
        <h1>Press update or create an issue</h1>
      )}
    </div>
  );
}

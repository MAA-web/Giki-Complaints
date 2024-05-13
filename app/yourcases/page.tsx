'use client'
import { useState } from "react";
import axios from "axios";
import {Button} from "@/components/ui/button";
import { Link } from "lucide-react";

export default function YourCases() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.post("/api/user/case/viewall");
      setData(response.data.dat.data);
      console.log(response.data.dat.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cases</h1>

      <Button variant="destructive" onClick={getData} >
        Update
      </Button>
      
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {data.map((item, index) => (
            <li key={index} className="bg-black text-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-bold">{item.result.title}</h2>
              <p>Description: {item.result.description}</p>
              <p>Hostel Number: {item.result.hostel_number}</p>
              <p>Room Number: {item.result.room_number}</p>
              <p>Complaintant Name: {item.result.complaintant_name}</p>
              <p>Status: {item.result.status}</p>
            </li>
          ))}
        </div>
    ): (<><h1>press update or create an issue</h1></>
    )}
    </div>
    
  );
}

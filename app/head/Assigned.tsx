'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Assigned() {
    const [assignedData, setAssignedData] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch('/api/head/getAssigned', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const jsonData = await response.json();
            setAssignedData(jsonData.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
            <Button variant={"destructive"} onClick={getData}>Get Assigned Data</Button>
            <ul className="mt-1 flex flex-row gap-1">
                {assignedData.map((item, index) => (
                    <li key={index} className="border p-1">
                        <p>ID: {item.result.id}</p>
                        <p>Time: {item.result.time}</p>
                        <p>Assignee: {item.result.assignee1}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

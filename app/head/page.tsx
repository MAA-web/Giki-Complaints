import { DataTable } from "@/components/dataTables";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Payment, columns } from "@/components/columns"
 

export default async function Head() {
  const supabase = createClient();

  async function getData(): Promise<Payment[]> {
    response = await supabase.rpc('execute_query', 
    {
      query_text : `select * from submitted_complaints`,
  
    })
    const data: Payment[] = response.data.map((item: any) => ({
      complaint_id: item.result.id,
      title: item.result.title,
      description: item.result.description,
      hostel_number: item.result.hostel_number,
      room_number: item.result.room_number,
      complainant_name: item.result.complainant_name,
      complainant_id: item.result.complainant_id,
      phone_number: item.result.phone_number,
      status: "pending", // Add the status property if needed
      time: item.result.time,
  }));
  return data;
  }

  //const { data: { user } } = await supabase.auth.getUser();
  const res = await supabase.auth.getSession()
  const d = await res.data.session?.user
  console.log("user id: " + d?.id);

  if (!d) {
    return redirect("/login");
  }

  const { data } = await supabase.rpc("execute_query", {
    query_text: `SELECT * FROM roles WHERE uid = '${d?.id}'`,
  });
  
  console.log(data[0].result.role);
  let response;
  async function view_all() {
    response = await supabase.rpc('execute_query', 
        {
          query_text : `select * from submitted_complaints`,
    
        })
    console.log(response.data)
  
  }
    await view_all();

  if (data[0].result.role === "user") {
    return (
      <>
        This page is for the heads only :)
      </>
    );
  } else if (data[0].result.role === "head") {
    const data = await getData()
    return (
      <>
        Welcome, head!
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
        {false && response.data.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">{item.result.title}</h2>
            <p className="text-gray-600">{item.result.description}</p>
            <div className="text-sm text-gray-500">
              <p>Hostel Number: {item.result.hostel_number}</p>
              <p>Room Number: {item.result.room_number}</p>
              <p>Complainant Name: {item.result.complainant_name}</p>
              <p>Complainant ID: {item.result.complainant_id}</p>
              <p>Phone Number: {item.result.phone_number}</p>
              <p>Time: {item.result.time}</p>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        Who the hell are you??!!!
      </>
    );
  }
}
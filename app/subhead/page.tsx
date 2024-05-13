import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RoleButton from "@/components/RoleButton";
import AuthButton from "@/components/AuthButton";

export default async function SubHead() {
  const supabase = createClient();

  
  //const { data: { user } } = await supabase.auth.getUser();
  const res = await supabase.auth.getSession()
  const d = await res.data.session?.user
  console.log("user id: " + d?.id);
  
  if (!d) {
      return redirect("/login");
    }
    
    async function getData1() {
        let response = await supabase.rpc('execute_query',
        {
          query_text : `select * from assigned a left join submitted_complaints sc on a.id = sc.id where assignee1 = '${d?.id}'`,
      
        })
        return response;
      }

  const { data } = await supabase.rpc("execute_query", {
    query_text: `SELECT * FROM roles WHERE uid = '${d?.id}'`,
  });
  
  console.log(data[0].result.role);

  let user_role = await data[0].result.role
  

  if (user_role === "user") {
    return (
      <>
        This page is for the heads only :)
      </>
    );
  } else if (user_role === "subhead") {
    let dataList = await getData1()
    console.log(dataList.data)
    return (
        <>
          <div className="flex-1 w-full flex flex-col gap-2 items-center">

            <h1>Welcome, Subhead!</h1>
            
            {
            //@ts-ignore
            dataList.data && dataList.data.map((dataItem, index) => (
              <div key={index} className="rounded-md border border-gray-200 p-4 mb-4">
                <h2 className="text-lg font-bold mb-2">{index + 1}</h2>
                <ul className="list-none p-0">
                  <li>
                    <strong>Title:</strong> {dataItem.result.title}
                  </li>
                  <li>
                    <strong>Description:</strong> {dataItem.result.description}
                  </li>
                  <li>
                    <strong>Hostel Number:</strong> {dataItem.result.hostel_number}
                  </li>
                  <li>
                    <strong>Room Number:</strong> {dataItem.result.room_number}
                  </li>
                  <li>
                    <strong>Complainant Name:</strong> {dataItem.result.complaintant_name}
                  </li>
                  <li>
                    <strong>Status:</strong> {dataItem.result.status}
                  </li>
                  <li>
                    <strong>Time:</strong> {dataItem.result.time}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </>
      );
  } else {
    return (
      <>
        You are not supposed to be here shoo off !!!
      </>
    );
  }
}
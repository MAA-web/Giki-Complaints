import { DataTable } from "@/components/dataTables";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Payment, columns } from "@/components/columns"
import RoleButton from "@/components/RoleButton";
import AuthButton from "@/components/AuthButton";
 

export default async function Head() {
  const supabase = createClient();
  let response
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
      complaintant_name: item.result.complaintant_name,
      complaintant_id: item.result.complaintant_id,
      phone_number: item.result.phone_number,
      status: item.result.status, // Add the status property if needed
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

  let user_role = await data[0].result.role

  if (user_role === "user") {
    return (
      <>
        This page is for the heads only :)
      </>
    );
  } else if (user_role === "head") {
    const data = await getData()
    return (
      <>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <RoleButton role={user_role} />
            <AuthButton />
          </div>
        </nav>
      </div>
        Welcome, head!
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
          
        </div>

        </div>
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
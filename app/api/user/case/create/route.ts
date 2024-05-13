import { NextResponse } from "next/server";


import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();
    console.log(user)
    if (user) {
        const payload = await req.json();
        let dat;
        let Desc = payload.Description;
        let title = payload.Title;
        let hostel_number = payload.Hostel_Number;
        let room_number = payload.Room_Number;
        let complaintant_name = payload.Complaintant_Name;
        let phone_number = payload.Phone_Number;
        
        console.log(Desc)
        //try {
        dat = await supabase.rpc('dynamic_sql', {
          sql_command: `insert into submitted_complaints (title, description, hostel_number, room_number, complaintant_name, complaintant_id, phone_number) values ('${title}', '${Desc}',${hostel_number},'${room_number}','${complaintant_name}','${user?.id}', '${phone_number}')`,
        });
        //} catch (error) {
        //  console.log(error)
        //}
        console.log(payload);

        return NextResponse.json({
          dat
        });
    } else {
        return NextResponse.json({
            'hi':'jk'
          });
    }

}
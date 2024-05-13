import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();
    console.log(user)

    const dat = await supabase.rpc('execute_query', 
    {
      query_text : `select * from roles where uid = '${user?.id}'`,
  
    })
    
    console.log(dat.data[0].result.role);

    if (((dat.data[0].result.role) == "head") && user) {
        const payload = await req.json();

        let complaint_id = payload.complaint_id;
        let value = payload.value

        console.log(payload);

        let data = await supabase.rpc('dynamic_sql', 
        {
          sql_command : `insert into assigned (id, assignee1) values ('${complaint_id}', '${value}')`,
    
        })
        return NextResponse.json({
          data
        });
    } else {
        return NextResponse.json({
            'hi':'jk'
          });
    }

}
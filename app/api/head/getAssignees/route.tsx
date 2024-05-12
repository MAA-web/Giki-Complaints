import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();

    const dat = await supabase.rpc('execute_query', 
    {
      query_text : `select * from roles where uid = '${user?.id}'`,
  
    })

    let hi =  await supabase.rpc('execute_query', 
    {
      query_text : `select * from roles where role = 'subhead'`,
  
    })
    
    console.log("@@@@@@@@@@inside getAssignee@@@@@@@@@@");




    console.log(hi)


    if (((dat.data[0].result.role) == "head") && user) {
      
        return NextResponse.json({
            hi
        });
    } else {
        return NextResponse.json({
            'hi':'jk'
          });
    }

}
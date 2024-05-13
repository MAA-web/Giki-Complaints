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

        let data = await supabase.rpc('execute_query', 
        {
          query_text : `select * from assigned`,
    
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
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
        let num = payload.vvv;
        
        let dat;

        dat = await supabase.rpc('dynamic_sql', {
          sql_command: `update submitted_complaints set status = 'pending' where id = ${num}`,
        });

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
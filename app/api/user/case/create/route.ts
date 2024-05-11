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
        try {
          const data = await supabase.rpc('dynamic_sql', {
            sql_command: `insert into submitted_complaints (uid, role) values ('${user?.id}', 'user')`,
          });
        } catch (error) {
          
        }
        console.log(payload);

        return NextResponse.json({
          payload
        });
    } else {
        return NextResponse.json({
            'hi':'jk'
          });
    }

}
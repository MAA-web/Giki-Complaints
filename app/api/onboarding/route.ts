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
        let Name = payload.Name;
        console.log(Name)
        
        dat = await supabase.rpc('dynamic_sql', {
          sql_command: `insert into roles (name, uid) values ('${Name}','${user?.id}')`,
        });
        let dt = await supabase.rpc('dynamic_sql', {
            sql_command: `insert into users (user_id, name) values ('${user?.id}', '${Name}')`,
        });
        console.log(dt)
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
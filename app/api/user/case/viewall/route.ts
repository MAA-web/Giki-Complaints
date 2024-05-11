import { NextResponse } from "next/server";


import { createClient } from "@/utils/supabase/server";

// this api will give back users complaints in the past

export async function POST(req: Request) {
    const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();
    console.log(user)
    if (user) {
        const payload = await req.json();
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
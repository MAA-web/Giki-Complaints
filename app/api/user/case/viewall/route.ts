import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();

    if (user) {
      let dat
        dat = await supabase.rpc('execute_query', {
          query_text: `select * from submitted_complaints where complaintant_id = '${user.id}'`,
        });

        return NextResponse.json({
          dat
        });
    } else {
        return NextResponse.json({
            'hi':'jk'
          });
    }

}
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function head() {

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("user id: " +  user?.id)
  
    if (!user) {
      return redirect("/login");
    }
    
  
    const dat = await supabase.rpc('execute_query', 
    {
      query_text : `select * from roles where uid = '${user?.id}'`,
  
    })
    
    console.log(dat.data[0].result.role);

    if ((dat.data[0].result.role) == "user") {
        return (<>
            This page is for the heads only :)
        </>)
    }
    else if ((dat.data[0].result.role) == "head") {
        return (<>
            welcome if you are a head otherwise moye moye :)
        </>)
    }
    else {
        return (<>
        Who the hell are you??!!!
        </>)
    }
}
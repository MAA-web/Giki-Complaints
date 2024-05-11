import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Viewcases from "./caseview";

export default async function issue() {

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("user id: " +  user?.id)

    if (!user) {
      return redirect("/login");
    }
    
    return (
      <>
      YOUR CASES 
        <Viewcases user_id={user?.id}></Viewcases>
      </>
    )



}
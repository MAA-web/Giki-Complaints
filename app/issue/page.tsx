import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NForm from "./form";
import AuthButton from "@/components/AuthButton";

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
        <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            {/* <RoleButton role={r} /> */}
            <AuthButton />
          </div>
        </nav>
      </div>
      <NForm></NForm>
    </>
  )



}
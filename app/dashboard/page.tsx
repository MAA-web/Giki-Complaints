import DeployButton from "@/components/RoleButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import RoleButton from "@/components/RoleButton";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("user id: " +  user?.id)

  if (!user) {
    return redirect("/login");
  }
  
  //const { data, error } = await supabase.rpc('hello_world') // WORKS
  
  //console.log(data)
  //const data1  = await supabase.rpc('execute_dynamic_sql', {sql_command: 'select * from \'hi\''}) // WORKS

  const data = await supabase.rpc('dynamic_sql', {
      sql_command: `insert into roles (uid, role) values ('${user?.id}', 'user')`,
  });

  //const data1 = await supabase.rpc(
  //  'dynamic_sql',
  //  {sql_command: ``}
  //)
  console.log(data)
  //console.log('data: ' + data.error)

  const dat = await supabase.rpc('execute_query', 
  {
    query_text : `select * from roles where uid = '${user?.id}'`,

  })
  
  console.log(dat.data);

  //console.log(data.data)

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center hidden">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <RoleButton />
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          <FetchDataSteps />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}

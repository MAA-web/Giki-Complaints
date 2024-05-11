import DeployButton from "@/components/RoleButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import RoleButton from "@/components/RoleButton";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import Lists from "@/components/lists";

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
  let r = "hi"
  try {
    
    r = dat.data[0].result.role
    console.log(dat.data);
  } catch (error) {
    
  }

  //console.log(data.data)

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center text-white bg-black">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <RoleButton role={r} />
            <AuthButton />
          </div>
        </nav>
      </div>

      <Button asChild variant="outline">
        <Link href="/issue">Issues</Link>
      </Button>
      <Lists data={[
        { result: { role: 'hi', uid: 'hi' } },    
        { result: { role: 'test', uid: 'test' } },  {
          result: { role: 'user', uid: 'c4150655-8724-4ebc-9e54-0b660c8f973c' }
        },
        {
          result: { role: 'head', uid: '5f5d6bcf-ba11-4b70-881d-ecc4f2cfa022' }
        }
      ]} />

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="http://instagram.com/mianaliahmed78"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Mian Ali Ahmed
          </a>
        </p>
      </footer>
    </div>
  );
}

import { createClient } from "@/utils/supabase/server";

export default async function RoleButton() {
  const supabase = createClient()
  const res = await supabase.auth.getSession()
  const d = await res.data.session?.user
  const { data } = await supabase.rpc("execute_query", {
    query_text: `SELECT * FROM roles WHERE uid = '${d?.id}'`,
  });
  
  console.log(data[0].result.role);

  let user_role = await data[0].result.role
  return (
    <p
      className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
      rel="noreferrer"
    >
      Role: {user_role}
    </p>
  );
}

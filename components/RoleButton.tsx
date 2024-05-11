
export default function RoleButton(r:any) {
  const {role} = r;
  console.log(role)
  return (
    <p
      className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
      rel="noreferrer"
    >
      Role: {role}
    </p>
  );
}

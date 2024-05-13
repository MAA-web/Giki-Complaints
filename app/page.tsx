import DeployButton from "../components/RoleButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };
  //<DeployButton />
  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center text-white bg-black">
      {/* <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav> */}

      <Button asChild variant="outline">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      
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

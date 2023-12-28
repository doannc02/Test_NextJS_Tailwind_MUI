import { Inter } from "next/font/google";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const router = useRouter();
  return (
    <main className={`flex min-h-screen flex-col items-center justify-around pt-10 ${inter.className}`}>
       <div className="text-3xl flex justify-center">Welcome to website!</div>
      <div><button className="bg-emerald-400 m-2 rounded-xl p-4" onClick={() => router.push("/account/login")}>Signin</button>
      <button className="bg-emerald-400 m-2 rounded-xl p-4" onClick={() => router.push("/account/signup")}>Signup</button></div>
    </main>
  );
}


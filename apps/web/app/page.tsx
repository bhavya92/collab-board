"use client";

export default function Home() {

  async function handleSignIn(){
    // const res = await fetch("http://localhost:3002/auth/google",{
    //   method:"GET",
    //   headers:{
    //     "Content-Type":"application/json"
    //   }
    // });
    // const resJson = await res.json();
    // console.log(resJson);
    window.location.href = 'http://localhost:3002/auth/google';
  }

  return <div className="w-screen h-screen bg-amber-50 flex justify-center items-center">
      <span className="text-6xl text-zinc-800">Hello World!</span>
      <button onClick= {handleSignIn}>Signin with Google</button>
  </div>
}

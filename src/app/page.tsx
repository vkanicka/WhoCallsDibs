'use client'

import { UserContext } from "@/data/context/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const userCtx = useContext(UserContext)
  const router = useRouter()
  
  const routeUser = () => {
    if (!!userCtx.user.$id) {
      router.push(`/browse`)
    } else {
      router.push('/account/login')
    }
  }

  useEffect(() => {
    routeUser()
  }, [userCtx])

  return (
    <main>
    </main>
  );
}

'use client'
import { useRouter } from "next/navigation";
function MyApp() {
    const router = useRouter();

    router.push('/usuarios');
    return(<></>);
  }
  
export default MyApp;
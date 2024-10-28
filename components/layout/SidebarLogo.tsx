import { useRouter } from "next/router";
import { GiRaven } from "react-icons/gi";

const SidebarLogo=()=>{
    const Icon =<GiRaven/>
    const router= useRouter();
    return(<div onClick={()=>router.push('/')}
     className="
    relative
    
    lg:flex
    items-center
    gap-4
    p-4
    rounded-full
    hover:bg-slate-300
    hover:bg-opacity-10
    cursor-pointer
    ">
        <GiRaven size={28} color="light-grey"/>

        </div>)
}
export default SidebarLogo;
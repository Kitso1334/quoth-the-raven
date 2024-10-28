import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { GiFeather } from "react-icons/gi";


const SidebarTweetButton=()=>{
    const router=useRouter();
    const loginModal =useLoginModal();
    const onClick = useCallback(()=>{
        loginModal.onOpen();
    },[loginModal])

    return(<div onClick={onClick}
    >
        <div className="
       mt-6
       lg:hidden
       rounded-full
       h-14
       w-14
       p-4
       flex
       items-center
       justify-center
       bg-sky-800
       hover:bg-opacity-80
       transition
       cursor-pointer ">
        <GiFeather size={26} color="white"/>

        </div>
        <div className="
       mt-6
      hidden
      lg:block
       rounded-full
       px-4
       py-2
       
       items-center
       justify-center
       bg-gray-600
       hover:bg-opacity-90
       transition
       cursor-pointer ">
        
        <p className="
        hidden
        lg:block
        text-center
        font-semibold
        text-gray-200 
        text-[20px]">
            Quoth
        </p>

        </div>
    </div>)
}
export default SidebarTweetButton;
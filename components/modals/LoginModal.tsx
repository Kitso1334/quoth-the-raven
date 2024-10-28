import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

const LoginModal =()=>{
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [isLoading,setIsLoading]=useState(false)
const loginModal= useLoginModal();
const registerModal=useRegisterModal();

const onToggle=useCallback(()=>{
if(isLoading){
return;
}

loginModal.onClose();
registerModal.onOpen();
},[isLoading,registerModal,loginModal])






const onSubmit =useCallback( async()=>{
try{
setIsLoading(true)

//TODO: ADD LOGIN
await signIn('credentials',{
email,
password
})




}catch(error){
console.log(error)
}finally{
setIsLoading(false)
}

},[loginModal,email,password])

const bodyContent =(
<div className="flex flex-col gap-4">
<Input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
value={email}
disabled={isLoading}/>
<Input
placeholder="Password"
type="password"
onChange={(e)=>setPassword(e.target.value)}
value={password}
disabled={isLoading}/>

</div>
)

const footerContent=(
<div className="text-neutral-400 text-center mt-4">
<p>Don't have an account?
<span onClick={onToggle}
className="text-white cursor-pointer hover:underline">
Register
</span>
</p>

</div>
)

return(<Modal
disabled={isLoading}
isOpen={loginModal.isOpen}
title='Sign in '
actionLabel="Login"
onClose={loginModal.onClose}
onSubmit={onSubmit}
body={bodyContent}
footer={footerContent}

/>)
}
export default LoginModal;

import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal =()=>{
const loginModal= useLoginModal();
const registerModal= useRegisterModal();
const [email,setEmail]=useState('')
const [name, setName]=useState('')
const [username, setUsername]=useState('')
const [password,setPassword]=useState('')
const [isLoading,setIsLoading]=useState(false)

const onToggle=useCallback(()=>{
if(isLoading){
return;
}
registerModal.onClose();
loginModal.onOpen();

},[isLoading,registerModal,loginModal])


const onSubmit =useCallback( async()=>{
try{
setIsLoading(true)

//TODO: ADD LOGIN
await axios.post('/api/register',{
email,
password,
username,
name
})
console.log({ email, password, username, name });

toast.success('Account created')
signIn('credentials',{
email,
password
})


registerModal.onClose()




}catch(error){
console.log(error)
toast.error("Something's not right")
}finally{
setIsLoading(false)
}


},[email, password, username, name,registerModal]
)

//TODO: ADD LOGIN AND REGISTER





const bodyContent =(
<div className="flex flex-col gap-4">
<Input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
value={email}
disabled={isLoading}/>
<Input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
value={name}
disabled={isLoading}/>
<Input
placeholder="username"
onChange={(e)=>setUsername(e.target.value)}
value={username}
disabled={isLoading}/>
<Input
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
value={password}
disabled={isLoading}/>

</div>
)
const footerContent=(
<div className="text-neutral-400 text-center mt-4">
<p>Have an account?
<span
onClick={onToggle}
className="text-white cursor-pointer hover:underline"
> Sign In</span>
</p>
</div>
)



return(<Modal
disabled={isLoading}
isOpen={registerModal.isOpen}
title='Create an account'
actionLabel="Register"
onClose={registerModal.onClose}
onSubmit={onSubmit}
body={bodyContent}
footer={footerContent}

/>)
}
export default RegisterModal;
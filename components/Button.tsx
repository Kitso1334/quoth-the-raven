
interface ButtonProps{
    label:string
    onClick:()=>void
    secondary?:boolean
    fullwidth?:boolean
    large?:boolean
    disabled?:boolean
    outline?:boolean


}

const Button:React.FC<ButtonProps> =({
    label,
    disabled,
    outline,
    secondary,
    large,
    fullwidth,
    onClick
})=>{
    return(<button
        onClick={onClick}
        disabled={disabled} 
        className={`
    disabled:opacity-70
    disbaled:cursor-not-allowed
    rounded-full
    font-semibold
    hover:opacity-80
    transition
    border-2
    ${fullwidth? 'w-full':'w-fit'}
    ${secondary? 'bg-slate-300':'bg-gray-600'}
    ${secondary?'text-black':'text-white'}
     ${secondary?'border-black':'border-bg-sky-700'}
     ${large?'text-xl':'text-md'}
     ${large?'px-5':'px-4'}
     ${large?'py-3':'py-2'}
     ${outline?'bg-transparent':''}
     ${outline?'border-light-grey':''}
     ${outline?'text-light-grey':''}`
    }>
        {label}
    </button>)
}
export default Button;
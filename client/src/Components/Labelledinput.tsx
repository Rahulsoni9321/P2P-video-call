

interface Labelledinput{
    label:string,
    placeholder:string,
    setvalue:React.Dispatch<React.SetStateAction<string>>
}
const Labelledinput = ({label,placeholder,setvalue}:Labelledinput) => {
  return (
    <div className="flex flex-col text-black">
      <label>{label}</label>
      <input className="border border-1 border-gray-300 rounded-xl px-4 py-2" type='text' placeholder={placeholder} onChange={(e)=>{
        setvalue(e.target.value)
      }}></input>
    </div>
  )
}

export default Labelledinput

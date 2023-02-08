

type FormFielProps ={
  labelName:string,
  type:string,
  name:string,
  placeholder:string,
  value:string,
  handleChange:(e:InputEvent) =>void,
  isSurpriseMe?:boolean,
  handleSurpriseMe?:() =>void

}

const FormField = ({ labelName, type, name, placeholder, value, 
  handleChange, isSurpriseMe, handleSurpriseMe }:FormFielProps) => {

  return (
    <div className="flex items-center gap-2 mb-2">
      <label 
        htmlFor={name}
        className="block self-start text-sm font-medium text-gray-900"
      >
        {labelName}
      </label>
        {isSurpriseMe &&( 
          <button 
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Suprise me
          </button>
        )} 

        <input 
          type={type}
          id={name} 
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          className="bg-gray-50 p-3 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full" 
        />

    </div>
  )
}

export default FormField;
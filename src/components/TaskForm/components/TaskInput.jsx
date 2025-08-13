import { Controller } from "react-hook-form";
import './TaskInput.css'

export const InputTask = ({name, control, label, type, error}) => {
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Controller 
            name={name} 
            control={control} 
            render={({field})=> <input id={name} type={type} label={label} {...field} className={`form-control ${error ? "is-invalid": ""}`}/>}/>
            {error && <p className='error'>{error.message}</p>}
        </div>
    )
}
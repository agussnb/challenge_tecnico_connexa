import './Button.css'

export const Button = ({label, parentMethod}) =>{
    return (
        <button onClick={parentMethod}>{label}</button>
    )
}
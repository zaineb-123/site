// const ButtonProps=React.HTMLAttributes<HTMLButtonElement>&{
//     variant?:'primary'|'secondary'
    
// };
// export default function Button({className,variant,...props}:ButtonProps){
    
// }
import './button.css'
import React from "react";


const button=props=>{
   const btnEnableDisable = !props.isDisabled ? "btn-enable" : "btn-disabled";
    return(
        <button
        className={`btn ${btnEnableDisable}`}
        disabled={props.isDisabled}



        >
            {props.value}

        </button>
    )
}

button.defaultProps={
    type:"button",
    disabled:true
};
export default button;
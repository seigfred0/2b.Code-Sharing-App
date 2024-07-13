import { useState } from "react";


function Button({title, type}) {
    const showOptions = () => {
        
    }

    if (type === 'select') {
        return (
            <div className="button" onClick={showOptions}>
                <p>{ title }</p> 
                <img src="./src/assets/downArrow.svg" alt="" />

                <div className="option-container">
                    <div className="option">JavaScript</div>
                    <div className="option">Python</div>
                    <div className="option">Java</div>
                </div>
            </div>
        )
    } else if (type === 'toggle'){
        return (
            <div className="toggle-btn button">
                <p>{ title }</p>
                <div className="circle"></div>
            </div>
        )
    }
}

export default Button;
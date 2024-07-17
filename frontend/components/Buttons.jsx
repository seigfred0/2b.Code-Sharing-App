import { useState, useEffect } from "react";


function Button({title, type, language, darkMode}) {
    const [isButton, setIsButton] = useState(false);
    const [titleLang, setTitleLang] = useState('HTML')
    const showOptions = () => {
        setIsButton(prevState => !prevState);
    }

    const passLanguage = (e) => {
        const lang = e.target.textContent;
        const langFormat = lang.toLowerCase();
        setTitleLang(lang)
        language(langFormat)
    }

    useEffect(() => {

        setTitleLang(title.toUpperCase());
    }, [title]);


    if (type === 'select') {
        return (
            <div className="button" onClick={showOptions}>
                <p>{ titleLang }</p> 
                <img src="./src/assets/downArrow.svg" alt="" />

                { isButton ? 
                    <div className="option-container">
                        <div className="option" onClick={passLanguage}>JavaScript</div>
                        <div className="option" onClick={passLanguage}>HTML</div>
                        <div className="option" onClick={passLanguage}>Python</div>
                        <div className="option" onClick={passLanguage}>Java</div>
                    </div>
                    : null
                }
            </div>
        )
    } else if (type === 'toggle'){
        return (
            <div className="toggle-btn button" onClick={darkMode}>
                <p>{ title }</p>
                <div className="circle"></div>
            </div>
        )
    }
}

export default Button;
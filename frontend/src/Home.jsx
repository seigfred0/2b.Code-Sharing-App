
import CodeEditor from "../components/CodeEditor";
import { useState } from "react";
import Button from "../components/Buttons";

function Home() {

    const [code, setCode] = useState('// Write your code here');
    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState('vs-dark');
  
    const handleCodeChange = (newCode) => {
      setCode(newCode);
    };

    return(
        <div className="container">
            <div className="text">
                <img src="./src/assets/NoteCodeLogo.svg" alt="" />
                <h3>Create & Share</h3>
                <h1>Your Code easily</h1>
            </div>
            <div className="content">
                <CodeEditor  
                code={code}
                language={language}
                theme={theme}
                onChange={handleCodeChange}
                />

                <div className="button-container">
                    <div className="options">
                        <Button title="HTML" type="select" options={['HTML', 'JavaScript', 'Python']}/>
                        <Button title="Light" type="toggle"/>
                    </div>
                    <div className="share"></div>
                </div>
            </div>
        </div>
    )
}

export default Home;
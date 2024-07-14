
import CodeEditor from "../components/CodeEditor";
import { useState } from "react";
import Button from "../components/Buttons";
import axios from 'axios'

function Home() {

    const [code, setCode] = useState('// Write your code here');
    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState('vs-light');
  
    const handleCodeChange = (newCode) => {
      setCode(newCode);
    };

    const sendToServer = async () => {
        console.log('sending from client, prepare...');
        // const lol = 'uhmm did I arrive';
    
        try {
            const result = await axios.post('http://localhost:3000/api/test', { code });
            console.log('sent from server', result.data); // Log the response from the server
        } catch (error) {
            console.error('Error sending to server:', error); // Log any errors that occur
        }
    }

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

                    <div className="share">
                        <button onClick={sendToServer}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
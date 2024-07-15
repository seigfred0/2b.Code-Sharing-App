
import CodeEditor from "../components/CodeEditor";
import { useEffect, useState } from "react";
import Button from "../components/Buttons";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

function Home() {

    const [code, setCode] = useState('// Write your code here');
    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState('vs-light');
    const { uniqueId } = useParams();
    const navigate = useNavigate();
    const [shareEnable, setShareEnable] = useState(false);
    const [isModified, setIsModifired] = useState(false);

  
    const handleCodeChange = (newCode) => {
      setCode(newCode);
    };


    // handling fetching code and displaying

    useEffect(() => {
        if (uniqueId) {
            console.log('ohhh theres a parameter')
            fetchCode(uniqueId)
        }
    }, [uniqueId]);

    
    const fetchCode = async (id) => {
        try {
            const result = await axios.get(`http://localhost:3000/api/code/${id}`)
            const { code } = result.data;
            console.log(code)
            const displayCode = code.code;
            setCode(displayCode)
        

        
        } catch (error) {
            console.error(error)
        }
        
    }

    const sendToServer = async () => {
        try {
            const result = await axios.post('http://localhost:3000/api/share', { code });
            const { uniqueId } = result.data
            console.log('server response ' + uniqueId)
            navigate(`/${uniqueId}`);

        } catch (error) {
            console.error('Error sending to server:', error); 
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
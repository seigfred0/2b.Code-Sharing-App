
import CodeEditor from "../components/CodeEditor";
import { useEffect, useState } from "react";
import Button from "../components/Buttons";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

function Home() {
    const API = 'https://twob-backend.onrender.com';
    const [code, setCode] = useState('// Write your code here');

    const [language, setLanguage] = useState('html');
    const [theme, setTheme] = useState('vs-dark');
    const { uniqueId } = useParams();
    const navigate = useNavigate();
    const [shareEnable, setShareEnable] = useState(true);
    const [isModified, setIsModified] = useState(false);
    const [link, setLink] = useState('');

    const handleLanguage = (newLanguage) => {
        setLanguage(newLanguage)
        console.log(newLanguage)
    }

    const changeTheme = () => {
        setTheme(prevTheme => prevTheme === 'vs-light' ? 'vs-dark' : 'vs-light');
        
    }

    const handleCodeChange = (newCode) => {
      setCode(newCode);
      updateIsModified(true)

    };

    const updateIsModified = (value) => {
        setIsModified(value);
        console.log('isModified:', value);
    };

    useEffect(() => {
        if (uniqueId) {
            fetchCode(uniqueId)
        }
    }, [uniqueId]);

    
    const fetchCode = async (id) => {
        try {
            const result = await axios.get(`${API}/api/code/${id}`)
            const { code, language } = result.data;
            console.log(code)
            console.log(language)

            const displayCode = code;
            handleLanguage(language)
            setCode(displayCode);
            setShareEnable(false);
            setLink(id);
        

        
        } catch (error) {
            console.error(error)
        }
        
    }

    const sendToServer = async (e) => {
        try {
            if (e.target.textContent === 'Update' && uniqueId && isModified) {
                
                const result = await axios.put(`${API}/api/code/${uniqueId}`, { code, language });
                
                    
                console.log(result.data)
            } else {
                const result = await axios.post(`${API}/api/share`, { code, language });
                const { uniqueId } = result.data
                setLink(uniqueId)
                // navigate(`/${uniqueId}`);
                navigate(`/api/code/${uniqueId}`);

            }
            updateIsModified(false)
           

        } catch (error) {
            console.error('Error sending to server:', error); 
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            console.log('Link copied to clipboard!');
        }).catch((error) => {
            console.error('Error copying text: ', error);
        });
    };

    const testBackend = async () => {
        try {
            const response = await axios.get(`${API}/api`);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return(
        <div className="container">
            <div className="text">
                <img src="./NoteCodeLogo.svg" alt="" />
                <h3>Create & Share</h3>
                <h1>Your Code easily</h1>
            </div>
            <div className="content" style={{ backgroundColor: theme === 'vs-dark' ? '#1E1E1E' : '#FFFFFE'}}>
                <CodeEditor  
                code={code}
                language={language}
                theme={theme}
                onChange={handleCodeChange}
                />

                <div className="button-container">
                    <div className="options">
                        <Button title={language} type="select" options={['HTML', 'JavaScript', 'Python']} language={handleLanguage}/>
                        <Button title="Light" type="toggle" darkMode={changeTheme}/>
                        <button onClick={testBackend}>Say hi</button>
                    </div>

                    <div className="share" style={{ display: 'flex', justifyContent: link ? 'space-between' : 'flex-end' }}>
                        {link && (
                            <div className="share-link" onClick={copyToClipboard}>
                                <img src="/link.svg" alt="" />
                                <p>../{link}</p>
                            </div>
                        )}
                        
                        <button onClick={sendToServer} >
                            { shareEnable ? 'Share' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
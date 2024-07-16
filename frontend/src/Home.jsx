
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
    const [shareEnable, setShareEnable] = useState(true);
    const [isModified, setIsModified] = useState(false);

    const [link, setLink] = useState('');

  
    const handleCodeChange = (newCode) => {
      setCode(newCode);
      updateIsModified(true)


    };



    const updateIsModified = (value) => {
        setIsModified(value);
        console.log('isModified:', value);
    };


    // handling fetching code and displaying

    useEffect(() => {
        if (uniqueId) {
            fetchCode(uniqueId)
        }
    }, [uniqueId]);

    
    const fetchCode = async (id) => {
        try {
            const result = await axios.get(`http://localhost:3000/api/code/${id}`)
            const { code } = result.data;
            console.log(code)
            const displayCode = code.code;
            setCode(displayCode);
            setShareEnable(false);
            setLink(id)
        

        
        } catch (error) {
            console.error(error)
        }
        
    }

    const sendToServer = async (e) => {
        try {
            if (e.target.textContent === 'Update' && uniqueId && isModified) {
                const result = await axios.put(`http://localhost:3000/api/code/${uniqueId}`, { code });

                console.log(result.data)
            } else {
                const result = await axios.post('http://localhost:3000/api/share', { code });
                const { uniqueId } = result.data
                setLink(uniqueId)
                navigate(`/${uniqueId}`);
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

                    <div className="share" style={{ display: 'flex', justifyContent: link ? 'space-between' : 'flex-end' }}>
                        {link && (
                            <div className="share-link" onClick={copyToClipboard}>
                                <img src="./src/assets/link.svg" alt="" />
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
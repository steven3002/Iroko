import { createContext, useState } from 'react';

const AppContext = createContext({
    contract: {},
    setContract: () => {},
    message: {},
    setMessage: () => {},
    tokens: [],
    setTokens: () => {},
    loaded: false,
    setUsersLoaded: () => {},
});

const AppProvider = ({ children }) => {
    const [contract, setContract] = useState({});
    const [message, setMessage] = useState({});
    const [tokens, setTokens] = useState([]);
    const [loaded, setLoaded] = useState(false);

    return (
        <AppContext.Provider value={{ 
            contract, setContract, message, setMessage, tokens, 
            setTokens, loaded, setLoaded 
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
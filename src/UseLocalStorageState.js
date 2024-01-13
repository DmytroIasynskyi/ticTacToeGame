import  {useEffect, useState} from 'react';

const useLocalStorageState = (key, defaultValue) => {
    const [state, setState] = useState(() => {
        const valueInStorage = window.localStorage.getItem(key);
        if (typeof valueInStorage === 'string') return JSON.parse(valueInStorage);
        return defaultValue;
    })

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [state, key])

    return [state, setState];
};

export default useLocalStorageState;
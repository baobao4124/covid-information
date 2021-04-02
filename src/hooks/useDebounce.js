import {useState, useEffect} from 'react';

export default (value, delay) => {
    try {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(
            () => {
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);

                return () => {
                    clearTimeout(handler);
                };
            },
            [value]
        );

        return debouncedValue;
    } catch (e) {
        // 
    }
};
import {useEffect, useRef} from 'react';

// Assets
import {handleError} from 'Src/handleError';

const PATH = 'Src/hooks/usePrevious.jsx';

const usePrevious = value => {
    try {
        const ref = useRef();

        useEffect(() => {
            ref.current = value;
        }, [value]);

        return ref.current;
    } catch (e) {
        handleError(e, {
            component: PATH,
            action: 'usePrevious',
            args: {value}
        });
    }
};

export default usePrevious;

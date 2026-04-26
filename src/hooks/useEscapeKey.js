import { useEffect } from "react";

export function useEscapeKey(callback) {
    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.code === 'Escape') {
                callback();
            }
        }

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        }
    }, [callback])
}
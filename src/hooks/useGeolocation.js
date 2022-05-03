import { useEffect, useState } from 'react';

export const useGeolocation = () => {
    const [coords, setCoords] = useState(null);

    const onSuccess = (position) => {
        setCoords([position.coords.latitude, position.coords.longitude])
    }

    const onError = () => {
        console.log("erro useGeolocation");
    }

    useEffect(() => {
        try {
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
        } catch (error) {
            console.log("erro useGeolocation catch");
        }
    }, [])

    return coords;
}
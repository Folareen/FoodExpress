import { useState, useEffect } from "react";
import sanityClient from '../config/sanityClient'

const useSanityFetch = (query: string, dependencies: any[]) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setError('')
        setLoading(true)
        sanityClient.fetch(query).then((data: any) => {
            setData(data)
        }).catch((err: any) => {
            setError(err?.message || err)
        }).finally(
            () => setLoading(false)
        )
    }, [...dependencies]);

    return {
        data,
        loading,
        error,
    };
};

export default useSanityFetch;
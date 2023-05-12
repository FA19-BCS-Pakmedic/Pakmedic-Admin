import react, {useState, useEffect, useMemo, useCallback} from 'react';


export const useApi = (options = {}) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async (apiCall) => {
        setIsLoading(true);
        try {
            if(apiCall){
                const response = await apiCall();
                setData(response.data);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return useMemo(() => ({
        data,
        error,
        isLoading,
        refetch: fetchData,
    }), [data, error, isLoading, fetchData]);
};
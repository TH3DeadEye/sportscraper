'use client';
import { useState, useEffect } from 'react';
import getmatches from "./api/streamedsu-api/getmatches";

export default function Home() {
    const [sport, setSport] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [allowedSports, setAllowedSports] = useState<string[]>([]);

    useEffect(() => {
        const fetchAllowedSports = async () => {
            const allsports = await fetch('https://streamed.su/api/sports');
            const sportIds = await allsports.json();
            setAllowedSports(sportIds.map((sportId: { id: string; }) => sportId.id));
        };
        fetchAllowedSports();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSport(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const data = await getmatches(sport);
            if (data.error) {
                setError(data.error);
                setResult(null);
            } else {
                setResult(data);
                setError(null);
            }
        } catch (err) {
            setError('Failed to fetch matches');
            setResult(null);
        }
    };

  function onKeyPressHandler(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key ==='Enter') {
    handleSubmit();
    }
  }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-black">Home</h1>
            <div className="w-full max-w-md">
                <input 
                    type="text" 
                    value={sport} 
                    onChange={handleChange} 
                    placeholder="Enter sport" 
                    className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
                    onKeyPress={onKeyPressHandler}
                />
                <button 
                    onClick={handleSubmit} 
                    className="w-full p-2 bg-blue-500 text-black rounded hover:bg-blue-600"
                >
                    Get Matches
                </button>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {result && <pre className="mt-4 p-4 bg-white rounded shadow text-black">{JSON.stringify(result, null, 2)}</pre>}
            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2 text-black">Allowed Sports:</h2>
                <ul className="grid grid-cols-4 gap-4">
                    {allowedSports.map(sport => (
                        <li key={sport} className="text-black grid">{sport}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';

type WeatherResponse = {
    resolvedAddress?: string;
    description?: string;
    currentConditions?: {
        temp?: number;
        conditions?: string;
    };
    days?: Array<{
        datetime?: string;
        tempmax?: number;
        tempmin?: number;
        conditions?: string;
    }>;
    error?: string;
};

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [data, setData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setData(null);

        if (!city.trim()) {
            setError('Please enter a city name.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                const message = (body as any)?.error || `Request failed with status ${res.status}.`;
                setError(message);
                return;
            }

            const json: WeatherResponse = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            setError('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Weather</h1>
            <p>
                Enter a city name to see the current conditions and a short forecast.
            </p>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-row">
                    <input
                        type="text"
                        className="input"
                        placeholder="City (e.g. Boston)"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit" className="button" disabled={loading}>
                        {loading ? 'Loading…' : 'Search'}
                    </button>
                </div>
            </form>

            {error && <div className="error">{error}</div>}

            {data && !error && (
                <div className="results">
                    <div className="results-title">
                        {data.resolvedAddress || 'Results'}
                    </div>
                    {data.currentConditions && (
                        <div>
                            <div>
                                Current temperature:{' '}
                                {Math.round(data.currentConditions.temp ?? 0)} °C
                            </div>
                            <div>Conditions: {data.currentConditions.conditions}</div>
                        </div>
                    )}

                    {data.days && data.days.length > 0 && (
                        <div className="forecast-list">
                            {data.days.slice(0, 5).map((day, index) => (
                                <div
                                    key={day.datetime ?? index}
                                    className="forecast-item"
                                >
                                    <div>{day.datetime}</div>
                                    <div>
                                        High: {Math.round(day.tempmax ?? 0)} °C, Low:{' '}
                                        {Math.round(day.tempmin ?? 0)} °C
                                    </div>
                                    <div>{day.conditions}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

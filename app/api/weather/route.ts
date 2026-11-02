import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
        return NextResponse.json(
            { error: 'Missing city query parameter.' },
            { status: 400 }
        );
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: 'Server misconfigured: missing API key.' },
            { status: 500 }
        );
    }

    const url = `${BASE_URL}/${encodeURIComponent(
        city
    )}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
        const res = await fetch(url, {
            cache: 'no-store',
        });

        if (!res.ok) {
            let body: any = null;
            try {
                body = await res.json();
            } catch {
            }

            const status = res.status;
            let message = 'Failed to fetch weather data.';

            if (status === 429) {
                message = 'Rate limit exceeded for the weather API.';
            } else if (status >= 500) {
                message = 'Weather service is currently unavailable.';
            } else if (status === 404) {
                message = 'Weather API endpoint not found (check URL structure).';
            }

            return NextResponse.json(
                { error: message, details: body },
                { status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error('Weather API error', err);
        return NextResponse.json(
            { error: 'Unexpected server error while fetching weather.' },
            { status: 500 }
        );
    }
}

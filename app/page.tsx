import Link from 'next/link'

export default function HomePage() {
    return (
        <>
            <h1>Home</h1>
            <p>
                This is a simple weather app that shows basic forecast data for a city.
                Use the navigation above to switch between pages.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <Link href="/weather" className="button">
                        Get Weather
                    </Link>
            </div>
        </>
    );
}

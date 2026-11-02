'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
    const pathname = usePathname();

    return (
        <header className="navbar">
            <div className="nav-title">CS 303 MP-4</div>
            <nav className="nav-links">
                <Link
                    href="/"
                    className={pathname === '/' ? 'nav-link-active' : 'nav-link'}
                >
                    Home
                </Link>
                <Link
                    href="/weather"
                    className={pathname === '/weather' ? 'nav-link-active' : 'nav-link'}
                >
                    Weather
                </Link>
                <Link
                    href="/about"
                    className={pathname === '/about' ? 'nav-link-active' : 'nav-link'}
                >
                    About
                </Link>
            </nav>
        </header>
    );
}

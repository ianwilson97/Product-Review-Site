import Link from 'next/link';

export default function Header() {
    return (
        <div className='header'>
            <h2 className='headerTitle'>Feedback App</h2>
            <div className='headerLinks'>
                <Link className='singleLink' href="/">
                    Home
                </Link>
                <Link className='singleLink' href="/dashboard">
                    Dashboard
                </Link>
            </div>
        </div>
    );
}
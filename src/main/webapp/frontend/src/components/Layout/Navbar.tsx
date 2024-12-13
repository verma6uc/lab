import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold">Creator Labs</span>
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        <Link 
                            to="/login" 
                            className="text-gray-600 hover:text-gray-900 px-3 py-2"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 
import Link from "next/link";


export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
            <h1 className="text-9xl font-bold text-red-500">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
                Oops! Page Not Found
            </h2>
            <p className="text-gray-600 mt-2 mb-6">
                The page you’re looking for doesn’t exist or has been moved.
            </p>

            <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all"
            >
                Back to Home
            </Link>
        </div>
    );
};
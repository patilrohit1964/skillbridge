import Navbar from "../components/navbar";

export default function Register() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h2>

                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

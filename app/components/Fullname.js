'use client'
import { useState } from "react";
import LoadingSpinner from './LoadingSpinner'

const Fullname = ({email}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const res = await fetch('/api/updateName', {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email
                })
            })
    
            const data = await res.json();

            await new Promise(res => setTimeout(res, 2000))
    
            if(data.success) {
                window.location.reload();
            }
    
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-28">

            <LoadingSpinner showLoading={isLoading} />

            <span className="flex flex-row justify-center mb-5">Please enter your first and last name.</span>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Fullname;
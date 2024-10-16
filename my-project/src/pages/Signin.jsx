import React, { useState } from 'react';
import { Auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = async (e) => {
        e.preventDefault();  
        try {
            await signInWithEmailAndPassword(Auth, email, password);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
             
                <h2 className="text-3xl font-bold text-center text-[#B88E2F] mb-6">Sign In</h2>

          
                <form onSubmit={handleSignin}>
          
                    <div className="mb-4">
                        <label className="block text-[#B88E2F] font-semibold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-[#B88E2F] rounded focus:outline-none focus:border-[#B88E2F]"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-[#B88E2F] font-semibold mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-[#B88E2F] rounded focus:outline-none focus:border-[#B88E2F]"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

        
                    <button
                        type="submit"
                        className="w-full bg-[#B88E2F] text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;

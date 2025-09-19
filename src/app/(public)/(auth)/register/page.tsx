"use client"
import Container from "@/components/shared/Container";
import { useState } from "react";
import { toast } from "sonner";

const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        email: "",
        password: "",
        name: ""
    })
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address.");
            setError({ email: "Please enter a valid email address.", password: "", name: "" });
            return;
        }
        if (!email || !password || !name) {
            toast.error("Please enter all fields.");
            setError({ email: !email ? "Email is required" : "", password: !password ? "Password is required" : "", name: !name ? "Name is required" : "" });
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            setError({ email: "", password: "Password must be at least 6 characters long.", name: "" });
            return;
        }
        try {
            console.log({ email, password });
            setError({ email: "", password: "", name: "" });
            toast.success("Login successful!");
        } catch (err: any) {
            toast.error(err.message || "An error occurred during login.");
            return;
        }
    };


    return (
        <div className="bg-gray-100">
            <Container>
                <div className="min-h-screen grid place-items-center">
                    <form onSubmit={handleRegister} className="bg-white flex flex-col w-full md:w-1/2 px-8 py-8 rounded-lg shadow-lg">
                        <h2 className="text-gray-900 mb-10 font-bold text-3xl title-font text-center ">Register</h2>
                        <p className="leading-relaxed mb-5 text-gray-600 text-sm ">Please enter your email and password to register.</p>
                        <div className="relative mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                className={`w-full bg-white rounded border  ${error.name ? "border-red-500" : "border-gray-300"} focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className={`w-full bg-white rounded border  ${error.email ? "border-red-500" : "border-gray-300"} focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                className={`w-full bg-white rounded border  ${error.password ? "border-red-500" : "border-gray-300"} focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />
                        </div>
                        <button className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-accent rounded text-lg cursor-pointer">Register</button>
                        <p className="text-xs text-gray-600 mt-2"> By registering, you agree to our Terms of Service and Privacy Policy.</p>
                        <p className="text-xs text-gray-500 mt-3">
                            Already have an account? <a href="/login" className="text-primary hover:underline">Login here</a>.
                        </p>
                    </form>
                </div>
            </Container>
        </div>
    )
}

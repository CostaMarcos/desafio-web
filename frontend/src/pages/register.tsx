import { useState } from "react";
import Head from "next/head";
import Link from 'next/link'
import { useRouter } from "next/router";
import { useRegister } from "@/hooks/auth/useRegister";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { register } = useRegister();
  
  const router = useRouter();

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter information");
    } else {
      register(username, email, password, password2)
        .then((res) => {
          router.push("/");
        })
        .catch((e) => alert(e.response.data.detail));
    }
  };
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Todo Application Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <div className="flex h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Register your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={onSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm">
                <div className="mb-2">
                  <label htmlFor="email-address" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username-address"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email-address" className="sr-only">
                    Username
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    autoComplete="confirm-password"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Confirm password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

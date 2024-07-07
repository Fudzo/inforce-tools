
'use client'
import { useStoreActions } from "easy-peasy";
import { useRef } from "react";

export default function Login() {

  const setShowLoading = useStoreActions(action => action.setShowLoading);
  const emailRef = useRef();

  async function loginUser() {
    const email = emailRef.current.value;

    const res = await fetch(`/api/otpService?email=${email}`, { method: "POST"});
    const data = await res.json();

    console.log(data)

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900 animate-fadeIn">

      <div className="max-w-md w-full space-y-8 p-10 rounded-xl shadow-lg bg-gray-800">
        <div>
          <svg width="300" height="100" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <path className="st0" d="M21.93,143.48H0V0h21.93V143.48z" />
            <path className="st0" d="M77.07,143.48L54.73,46.94l0.2,25.21v71.33H35.26V0h25.62l20.5,88.55l-0.2-23.98V0h19.67v143.48H77.07z" />
            <path className="st1" d="M161.74,0v19.88h-25.83v41.4h24.8v19.88h-24.8v62.31h-21.93V0H161.74z" />
            <path className="st1" d="M210.53,144.71h-11.69c-17.83,0-26.64-8.82-26.64-26.64V25.42c0-17.83,8.82-26.64,26.64-26.64h11.69   c17.83,0,26.64,8.81,26.64,26.64v92.65C237.17,135.89,228.36,144.71,210.53,144.71z M207.05,18.04h-4.51c-5.74,0-8.4,2.66-8.4,8.4   v90.6c0,5.74,2.66,8.4,8.4,8.4h4.51c5.53,0,8.2-2.67,8.2-8.4v-90.6C215.25,20.7,212.58,18.04,207.05,18.04z" />
            <path className="st1" d="M312.82,94.7v48.78h-21.93V95.11c0-6.35-2.87-9.22-9.22-9.22h-9.84v57.6h-21.93V0h36.08   c17.83,0,26.65,8.82,26.65,26.64V53.7c0,12.71-4.51,18.86-12.51,22.14C309.13,78.3,312.82,83.83,312.82,94.7z M282.49,19.47h-10.66   v47.35h9.84c6.15,0,9.02-2.87,9.02-8.82V27.67C290.68,22.14,288.02,19.47,282.49,19.47z" />
            <path className="st1" d="M389.29,84.66v33.41c0,17.83-8.82,26.64-26.65,26.64h-10.86c-17.83,0-26.65-8.82-26.65-26.64V25.42   c0-17.83,8.82-26.64,26.65-26.64h10.66c17.83,0,26.44,8.61,26.44,26.44v29.31h-21.52V26.44c0-5.74-2.67-8.4-8.2-8.4h-3.69   c-5.74,0-8.4,2.66-8.4,8.4v90.6c0,5.74,2.66,8.4,8.4,8.4h4.1c5.54,0,8.2-2.67,8.2-8.4V84.66H389.29z" />
            <path className="st1" d="M450.38,0v19.88h-26.85v40.58h25.83v19.88h-25.83v43.25h27.26v19.88h-49.2V0H450.38z" />
          </svg>

        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-inforce-blue">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                ref={emailRef}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-inforce-blue focus:border-inforce-blue focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            {/* <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-inforce-blue focus:border-inforce-blue focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div> */}
          </div>
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-inforce-blue focus:ring-inforce-blue border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div> */}
            {/* <div className="text-sm">
              <a href="#" className="font-medium text-inforce-blue hover:text-inforce-blue-dark">
                Forgot your password?
              </a>
            </div> */}
          </div>
          <div>
            <button
              type="button"
              onClick={loginUser}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-inforce-blue hover:bg-inforce-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inforce-blue"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

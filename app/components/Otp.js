import React, { useState, useRef } from 'react';
import { Toaster, toast } from "sonner";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const OTPInput = ( { email } ) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const router = useRouter();

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (element, index, event) => {
    if (event.key === 'Backspace' && !element.value) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      newOtp.forEach((value, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = value;
        }
      });
      inputRefs.current[5].focus(); // Focus on the last input field after pasting
    }
    event.preventDefault();
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');
    
    try {
      const loginUser = await fetch('/api/loginUser', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email,
          otp: otpCode
        })
      })
  
      const response = await loginUser.json();
      if(response.success) {
        Cookies.set('jwt_token', response.token, {
          expires: 365 * 10, // 10 years expiry
          secure: true,
          sameSite: 'strict',
          path: '/',
        });
        router.push('/main')
      } else {
        toast(response.message, {
          position: 'bottom-center'
        })
      }
    
    } catch (error) {
      toast('Something went wrong!', {
        position: 'bottom-center'
      })
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Toaster />
      <label className="text-lg font-bold text-black">Please enter OTP</label>
      <div className="flex space-x-2">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            defaultValue={value}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e.target, index, e)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-center text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>


      <button
        onClick={handleSubmit}
        className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Submit
      </button>

        <div>
          <p className='whitespace-normal w-full text-sm'>An OTP is sent to <span className='font-bold'>{email}</span>, once you enter it, you will be logged into the app.</p>
          <p className='whitespace-normal w-full text-sm'><span className='text-red-500'>Note:</span> Sometimes it can take up to two minutes for an email to arrive.</p>
        </div>
    </div>
  );
};

export default OTPInput;
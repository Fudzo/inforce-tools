import React from 'react';

const AppCard = ({ name, description, downloadUrl, developer, platform_name, stack, first_name, last_name }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <h2 className="text-xl font-semibold mb-4">{name}</h2>
      <p className="text-gray-600 mb-10">{description}</p>
      <div className='flex items-center justify-between'>
        {/* <a href={downloadUrl} className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Download
        </a>  */}
        <div className='flex gap-5'>
          <p>Used for: {platform_name}</p>
          <p>Developer: {developer}</p>
          <p>Tech stack: {stack}</p>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
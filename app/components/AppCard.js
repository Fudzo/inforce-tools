'use client'
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import RichTextEditor from './RichTextEditor';
import TurndownService from 'turndown';
import HtmlParser from './HtmlParser';



const AppCard = ({ app, isAdmin, platforms }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [moreInfo, setMoreInfo] = useState('');

  const turndownService = new TurndownService()


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { name, description, download_url, developer, platform_name, stack, usage } = app;

  function showMoreInfo(action) {
    if (action === 'hide') {
      setMoreInfo('')
      return
    }
    setMoreInfo(app.usage)
  }


  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">

      {isOpen && <Modal closeModal={closeModal} app={app} platforms={platforms} />}

      <h2 className="text-xl font-semibold mb-4">{name}</h2>
      <p className="text-gray-600 mb-10">{description}</p>

      <HtmlParser htmlContent={moreInfo} />

      {
        !moreInfo ?
          <button
            onClick={() => showMoreInfo()}
            className="px-4 py-1 my-3 bg-gray-200 text-black rounded hover:bg-gray-300 focus:outline-none" >More info
          </button> :
          <button
            onClick={() => showMoreInfo('hide')}
            className="px-4 py-1 my-3 bg-gray-200 text-black rounded hover:bg-gray-300 focus:outline-none">Hide More info
          </button>
      }
      <div className='flex items-center justify-between'>
        {/* <a href={downloadUrl} className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Download
        </a>  */}
        <div className='flex flex-col '>
          <p><span className='font-bold'>Used for:</span> {platform_name}</p>
          <p><span className='font-bold'>Developer:</span> {developer}</p>
          <p><span className='font-bold'>Tech stack:</span> {stack}</p>
        </div>

        {isAdmin &&
          <div className='flex flex-row gap-4'>
            <button
              onClick={openModal}
              className="px-4 py-1 my-3 bg-gray-200 text-black rounded hover:bg-gray-300 focus:outline-none"
            >
              Edit
            </button>
            <button
              onClick={openModal}
              className="px-4 py-1 my-3 bg-gray-200 text-black rounded hover:bg-gray-300 focus:outline-none"
            >
              Delete
            </button>
          </div>
        }

      </div>


    </div>
  );
};

function Modal({ closeModal, app, platforms }) {


  const { name, description, download_url, developer, platform_name, stack, usage, id } = app;
  const [tool, setTool] = useState({
    name, description, download_url, developer, platform_name, stack, usage, id
  })

  function updateToolState(value, nameToUpdate) {
    setTool(prev => {
      prev[nameToUpdate] = value;
      return { ...prev };
    })

  }

  async function updateTool() {
    const res = await fetch('/api/toolsService', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(tool)
    })

    const data = await res.json()

    if (data.success) {
      toast(data.message, {
        position: 'bottom-center',
        style: { width: '800px', display: 'flex', justifyContent: 'center' }

      })
    }
  }

  const textAreaStyle = {
    padding: '10px'
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Toaster />
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-50 w-10/12 h-10/12 flex flex-col justify-between">
        <div>

          <div className='flex'>
            <label className='mr-5 w-32 text-center flex justify-center flex-col'>Tool Name</label>
            <textarea
              cols={150}
              rows={2}
              value={tool.name}
              onChange={(e) => updateToolState(e.target.value, 'name')}
              style={textAreaStyle}
              className='border rounded-xl'
            />
          </div>

          <div className='flex'>
            <label className='mr-5 w-32  flex justify-center flex-col'>Description</label>
            <textarea
              cols={150}
              rows={2}
              value={tool.description}
              onChange={(e) => updateToolState(e.target.value, 'description')}
              style={textAreaStyle}
              className='border rounded-xl mt-1'
            />
          </div>

          <div className='flex'>
            <label className='mr-5 w-32  flex justify-center flex-col'>Developer</label>
            <textarea
              cols={150}
              rows={2}
              value={tool.developer}
              onChange={(e) => updateToolState(e.target.value, 'developer')}
              style={textAreaStyle}
              className='border rounded-xl mt-1'
            />
          </div>

          <div className='flex'>
            <label className='mr-5 w-32  flex justify-center flex-col'>Tech Stack</label>
            <textarea
              cols={150}
              rows={2}
              value={tool.stack}
              onChange={(e) => updateToolState(e.target.value, 'stack')}
              style={textAreaStyle}
              className='border rounded-xl mt-1'
            />
          </div>

          <div className='flex'>
            <label className='mr-5 w-32  flex justify-center flex-col'>Download</label>
            <textarea
              cols={150}
              rows={2}
              value={tool.download}
              onChange={(e) => updateToolState(e.target.value, 'download')}
              style={textAreaStyle}
              className='border rounded-xl mt-1'
            />
          </div>

          <div className='flex'>
            <label className='mr-5 w-32 flex justify-center flex-col'>Usage</label>
            <div className='mt-1 max-w-7xl'>
              <RichTextEditor
                value={tool.usage}
                onChange={(e) => updateToolState(e, 'usage')}
              />
            </div>
          </div>

        </div>

        <div>
          <button
            onClick={updateTool}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
          >Update</button>
        </div>

        <div className='flex justify-end'>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

}




export default AppCard;
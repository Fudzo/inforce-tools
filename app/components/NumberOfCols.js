'use client'

import { useSearchParams } from 'next/navigation';

export default function ColumnNumber({ layout }) {

    const layoutId = layout || '2';

    return (
        <div className='flex flex-row gap-4 mt-3 ml-5'>
            <div className="flex flex-col justify-center">
                <label className='text-black font-bold'>Number of columns</label>
            </div>
            <select
                defaultValue={layoutId}
                onChange={(e) => {
                    window.location.href = `/tools?layout=${e.target.value}`
                }}
                className='w-16 border rounded-xl p-1 text-center'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>
        </div>
    )
}
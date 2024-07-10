'use client'
import { useState } from 'react';

// const platforms = ['Platform 1', 'Platform 2', 'Platform 3'];

export default function Filter({ platforms }) {

    

    return (
        <div className='flex flex-col'>
        <div className='w-28 mt-4 font-bold flex flex-row justify-center mb-6'>Filters</div>

        {platforms.map(({id, platform_name}) => {
            return (
             <div key={id} className='flex flex-row gap-2 ml-4'>
                <input type='checkbox' />
                <label>{platform_name}</label>
             </div>
            )
        })}
        </div>
    )
}
"use client"
import useAppContext from '@/app/_custom-hooks/useAppContext'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { RiFocus3Line } from 'react-icons/ri'

function ImageFocusPoint() {
    const { focusPoint, focusRef, imageRefs, handleMouseDown, selectImageFile, isPopUp, handleCancel, handleSaveImage } = useAppContext()

    if (!selectImageFile || !selectImageFile.image) return;
    let url = URL.createObjectURL(selectImageFile.image);
    console.log(url);


    return (
        <div className={`main-image absolute inset-x-0 mx-auto top-1/12 w-[1000px] h-[700px] py-3 bg-white rounded z-30 ${isPopUp && selectImageFile.image ? "block" : "hidden"}`}>
            <h1 className='text-center text-md font-semibold'>Focus Point</h1>
            <hr className='py-5' />
            <div className="sections flex gap-20 justify-center px-15">
                <div className="firstSection relative ">
                    <Image src={url} alt="image" width={420} height={500} className="w-[420px] h-[500px] rounded " ref={imageRefs} draggable="false" />
                    <div className=' text-[50px] absolute top-3 bg-black opacity-20 text-white rounded-full' ref={focusRef}
                        style={{ top: `${focusPoint.y}%`, left: `${focusPoint.x}%` }}
                        onMouseDown={handleMouseDown}
                    >
                        <RiFocus3Line />
                    </div>
                </div>

                <div className="seconSection bg-[#f8f7fa] w-[300px] flex flex-col gap-5 p-5 rounded-2xl">
                    <h1 className='text-[14px] font-semibold'>
                        Preview your image
                    </h1>
                    <p className='text-[12px] text-gray-500'>
                        See how your image looks on different screen sizes. Attendees can expand the image to see the whole thing.
                    </p>

                    <div className="squareOne">
                        <h4 className='text-[12px] font-semibold'>Square (1:1)</h4>
                        <Image src={url} alt="image" width={200} height={200} className="w-[150px] h-[160px] rounded-2xl" style={{ objectFit: "cover", objectPosition: `${selectImageFile.X}% ${selectImageFile.Y}%` }} />

                    </div>

                    <div className="square2">
                        <h4 className='text-[12px] font-semibold'>Rectangle (2:1)</h4>
                        <Image src={url} alt="image" width={300} height={100} className="w-[300px] h-[150px] rounded object-center" style={{ objectFit: "cover", objectPosition: `${selectImageFile.X}% ${selectImageFile.Y}%` }} />
                    </div>
                </div>
            </div>
            <hr className='my-5' />

            <div className="buttons flex gap-5 justify-end px-5">
                <button className='border border-gray-500 py-2 px-8 rounded text-[13px] font-semibold' onClick={handleCancel}>Cancel</button>
                <button className='bg-[#d1410c] py-2 px-8 rounded text-[13px] font-semibold' onClick={handleSaveImage}>Save</button>
            </div>
        </div>

    )
}

export default ImageFocusPoint
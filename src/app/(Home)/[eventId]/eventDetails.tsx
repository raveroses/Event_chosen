"use client"
import { useEffect, useRef, useState } from 'react'
import { IoMdTimer } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
function EventDetails() {
    // const str = "Meet top institutions, explore global study opportunities, and take the next step in your academic journey at Lagos’ premier student recruitment fair. The Lagos Student Recruitment Fair is a flagship education event connecting leading international institutions with a diverse community of prospective students, parents, school counselors, and educational consultants from Lagos and neighboring regions. As Nigeria’s largest city and a major educational and economic hub in Africa, Lagos offers institutions a unique opportunity to engage directly with ambitious, globally minded students seeking international study opportunities. The fair provides a high-impact platform for universities, colleges, and training institutions to showcase their programs, engage directly with prospective students, and establish valuable recruitment and partnership opportunities in one of Nigeria’s most dynamic education markets. 💡 What to Expect: Direct engagement with motivated students and parents, one-on-one counseling and meaningful student interactions, on-the-spot inquiries and applications, information sessions covering visas, funding, admissions, and program requirements, networking opportunities with schools, education agents, and career advisors, increased brand visibility and access to qualified post-event leads. Whether your goal is to increase institutional visibility, attract a diverse pool of applicants, expand your recruitment network, or build strong partnerships with local education agents, the Lagos Student Recruitment Fair provides a strategic gateway to Nigeria’s growing international education market."

    // const [isReadmore, setIsReadMore] = useState(false)
    // const wordCount = isReadmore ? 100 : 50
    // const split = str.split(" ").splice(0, wordCount)

    // const handleReadmore = () => setIsReadMore((prev) => !prev)

    // let text = "";

    // for (let i = 0; i < split.length; i++) {
    //     text += `${split[i]} `
    // }
   


    return (

        <div>
            <div className="relative w-full h-[500px] md:flex flex-col justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center blur-xl scale-110  "
                    style={{ backgroundImage: "url(/images/conference.jpeg)" }}
                />
                <Image
                    src="/images/conference.jpeg"
                    alt="image"
                    width={900}
                    height={400}
                    className="relative object-cover rounded-lg"
                />
            </div>

            <div className="content">
                <div className="flex gap-10 justify-end my-7">
                    <div className="relative flex flex-col gap-5">
                        <div className="shareIcon text-lg ">
                            <FiUpload />
                        </div>

                        <div className="sharetooltips absolute -bottom-15 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-4 py-1 text-sm rounded">
                            Share Event
                        </div>
                    </div>

                    <div className="loveIcon text-lg relative">
                        <FaRegHeart />
                        {/* <FaHeart /> */}
                        <div className="likeTootip absolute left-[58%] -top-15 w-30 -translate-x-1/2 bg-gray-700 text-white px-4 py-2 text-center text-sm rounded">
                            Like Event
                        </div>
                    </div>
                </div>


                <div className="two-split flex justify-between items-start">
                    <div className="w-[55%] flex flex-col gap-5">
                        <h1 className="font-extrabold text-3xl leading-[110%]">
                            Worldview Education Fair 2026 [Lagos - Nigeria]
                        </h1>

                        <div className="profile flex gap-5 items-center">

                            <Image
                                src="/images/free.jpeg"
                                width={80}
                                height={80}
                                alt="profile-picture"
                                className="w-[80px] h-[80px] rounded-full object-cover"
                            />

                            <div>
                                <h1>
                                    By <span className="font-bold text-[16px]">
                                        Worldview International
                                    </span>
                                </h1>
                                <p>2.5k followers
                                    129 events
                                    4y hosting
                                    4.4k total attendees
                                </p>
                            </div>
                            <button className="border border-gray-500 font-semibold text-[12px] px-6 py-3 rounded">Follow</button>
                        </div>

                        <div className="detils flex flex-col gap-5">
                            <h1 className="font-bold text-xl ">Overview</h1>
                            <div className=' flex flex-col gap-5 '>

                                <p>
                                    Meet top institutions, explore global study options, and take the next step in your academic journey at Lagos premier student fair!

                                    The Lagos Student Recruitment Fair is a flagship education event that connects leading international institutions with a diverse pool of prospective students, parents, school counselors, and educational consultants from Nigeria’s commercial capital and neighboring regions.

                                    Lagos, being the largest city in Nigeria and a major educational and economic hub in Africa, presents a prime opportunity for institutions to engage directly with thousands of ambitious, globally-focused students seeking study-abroad options.

                                    This fair serves as a high-impact platform for universities, colleges, and training institutions to showcase programs, interact face-to-face with candidates, and build long-term recruitment channels in a market known for its high outbound student volume.

                                    💡 What to Expect:
                                    Direct engagement with motivated students and decision-making parents
                                    One-on-one counseling, inquiries, and on-the-spot applications
                                    Information sessions on visas, funding, and program requirements
                                    Networking with local schools, agents, and career advisors
                                    Exceptional brand exposure and access to post-event lead data
                                    Whether your goal is to expand your visibility, diversify your applicant pool, or solidify agent partnerships. Lagos is the ultimate gateway to Nigeria’s student market.
                                </p>

                                <div className='flex flex-col gap-5 py-5'>
                                    <h2 className='text-2xl font-bold'>Good to know </h2>

                                    <div className='bg-white shadow w-[250px] h-[250px] p-5 rounded flex flex-col gap-3 '>
                                        <h2 className='text-[18px] font-bold'>
                                            Highlights
                                        </h2>
                                        <div className='flex gap-3 text-gray-500'>
                                            <IoMdTimer size={20} />
                                            <p className='text-[17px] '>
                                                5 hours
                                            </p>
                                        </div>

                                        <div className='flex gap-3 text-gray-500'>
                                            <IoLocationSharp size={20} />
                                            <p className='text-[17px] '>
                                                In person
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className='text-xl font-bold py-4'>
                                        Location
                                    </h2>
                                    <div className='flex flex-col gap-4'>
                                        <h4 className='text-[16px] font-bold'>
                                            Lagos Marriott Hotel Ikeja
                                        </h4>
                                        <p className='text-[14px] text-gray-500 w-[200px]'>
                                            122 Joel Ogunnaike Street Lagos, LA 100271
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center bg-white py-6 px-3 shadow w-[30%] sticky top-22 ">
                        <div>
                            <h5 className="font-semibold">
                                Free
                            </h5>
                            <p className="text-md text-gray-500">
                                Tue, Oct 20 • 12 PM
                            </p>
                        </div>
                        <button className="bg-[#d1410c] text-white px-5 py-3 font-bold rounded">
                            Reserve a spot
                        </button>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default EventDetails
{/* <p className={`${!isReadmore ? "max-h-24 overflow-hidden" : ""}`}>
                    {text}
                </p>
                {!isReadmore && (
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
            </div>
            <button onClick={handleReadmore}>
                {isReadmore ? "Read less" : "Read more"}
            </button> */}
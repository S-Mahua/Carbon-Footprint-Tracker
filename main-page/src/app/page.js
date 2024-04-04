"use client";
import Spinner from "../components/Spinner";
import Link from 'next/link';
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { CiCircleCheck, CiHeart } from "react-icons/ci";
import { IoEllipsisVertical } from "react-icons/io5";
import './page.css'
export default function Page() {

  const { user } = useUser();
  return (
    <div className="min-h-screen bg-[#e8e6d7] py-6 flex flex-col gap-6 px-4 lg:px-16 md:px-10 sm:px-8">
      <div className="flex items-center justify-center gap-6">
        <div className="rounded-xl md:w-3/4 sm:w-3/5 w-full h-72  flex flex-col items-center justify-center text-white text-[7vw] md:text-[2.6vw] sm:text-[4vw]">
          <img className="w-full h-full object-cover origin-center" src={'./imag1.jpeg'}/>
        </div>
        <div className="rounded-xl md:w-1/4 w-2/5 sm:block hidden h-72 relative p-4">
          <Image
            src={"/logo.png"}
            fill
            alt="notfound"
            className="object-cover  w-full h-full opacity-60 rounded-xl"
          />
          <div className="absolute text-center top-1/3 left-1/3 text-2xl text-black">
            <p className="flex flex-col">
              <span className="font-bold text-3xl text-[#000000] text-center">
                Reduce
              </span>
              Reuse, Rethink
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 lg:flex-row flex-col">
        <div className="rounded-xl lg:w-[65%] w-full h-72 bg-[#b5bf96] md:p-10 sm:p-8 p-6 flex gap-6">
          <div className="h-full sm:w-[100%] w-full rounded-xl flex flex-col justify-between p-3">
            <p className="text-4xl text-center heading font-bold">About Us</p>
            <span className="text-3xl text-center">Welcome to GreenMeter, your partner in measuring and reducing your carbon footprint. Here's how we're making a difference:</span>
            {/* <div className="flex items-start justify-between"> */}
              {/* <div className="relative h-16 w-16 ">
                <Image
                  src="/avatar.webp"
                  alt="notfound"
                  fill
                  className="rounded-xl"
                />
              </div> */}
              {/* <div>
                <CiCircleCheck size={25} />
              </div> */}
            {/* </div> */}
             {/* <div> */}
            {/* <Link href="/reclaim" className="font-semibold">Scan QR</Link> */}
              {/* <h3 className="font-semibold">Local Lifestyle?</h3> */}
              {/* <span className="text-[#a4b651] font-semibold">Naturally</span> */}
            {/* </div>  */}
          </div>
          {/* <div className="bg-white h-full w-[40%] rounded-xl flex-col justify-between p-3 hidden sm:flex">
            <div className="flex items-start justify-end">
              <div>
                <CiHeart size={25} />
              </div>
            </div>
            <div className="">
              <h3 className="font-semibold">Love the ground</h3>
              <span className="text-[#a4b651] font-semibold">you walk</span>
            </div>
          </div> */}
        </div>
        <div className="rounded-xl lg:w-[45%] w-full sm:w-5/6 h-72 flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-6 h-full w-full">
            {/* <div className=" w-[40%] h-44 rounded-xl sm:block hidden ">
              <img className="w-4/5 ml-3 h-4/5" src={'./logo.png'}/>
              <h3 className="w-full text-xl text-center text-green-700">GreenMeter</h3>
            </div> */}
            <div className=" h-full w-full flex flex-col gap-4 justify-between">
              <div className="rounded-xl bg-white h-full w-full flex items-center p-2 gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <ClerkLoading>
                    <Spinner color="dark:text-white text-black" />
                  </ClerkLoading>
                  <ClerkLoaded>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </ClerkLoaded>
                </div>
                <div className="flex flex-col w-full">
                  <span>
                    <SignedIn>{user?.fullName}</SignedIn>
                    <SignedOut>Guest User</SignedOut>
                  </span>
                  <span className="text-xs flex items-center justify-center rounded cursor-pointer w-fit text-neutral-600">
                    <ClerkLoaded>
                      <SignedIn>
                        since: {user?.createdAt.toLocaleDateString()}
                      </SignedIn>
                    </ClerkLoaded>
                  </span>
                </div>
                <div className="">
                  <IoEllipsisVertical />
                </div>
              </div>
              <div className="h-full w-full bg-[#e0dfce] rounded-xl flex items-center justify-evenly">
                <span className="text-xs bg-white rounded-lg p-1 px-2">
                <Link href="/user-profile">User Profile</Link>
                </span>
                <span className="text-xs bg-white rounded-lg p-1 px-2">
                <Link href="/feedback">Feedback</Link>
                </span>
                <span className="text-xs bg-white rounded-lg p-1 px-2">
                <Link href="/faq">FAQ</Link>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 h-full w-full">
            {/* <div className="bg-[#e0dfce] w-[40%] h-full rounded-xl p-10 relative sm:block hidden">
              <Image
                src={"/avatar.webp"}
                alt="not found"
                fill
                className="rounded-xl object-cover"
              />
            </div> */}
            <div className=" h-full w-full flex flex-col gap-4 justify-between">
              <div className="h-full w-full flex items-center justify-center bg-[#e0dfce]">
                <ClerkLoading>
                  <Spinner color="black" />
                </ClerkLoading>
                <ClerkLoaded>
                  <SignedIn>
                    <SignOutButton>
                      <div className="h-full w-full bg-[#e0dfce] rounded-xl flex items-center justify-center text-xl text-[#526527] px-4 font-medium hover:bg-[#d4d3bb] cursor-pointer">
                        <span className="sr-only">LogOut</span>
                        <span>Logout</span>
                      </div>
                    </SignOutButton>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton afterSignInUrl="/" mode="modal">
                      <div className="h-full w-full bg-[#e0dfce] rounded-xl flex items-center justify-center text-xl text-[#526527] px-4 font-medium hover:bg-[#d4d3bb] cursor-pointer">
                        SignIn / SignUp
                      </div>
                    </SignInButton>
                  </SignedOut>
                </ClerkLoaded>
              </div>
              <div className="h-full w-full bg-white rounded-xl p-4">
                <div className="bg-[#e0dfce] h-full w-full rounded-lg flex items-center justify-evenly text-sm p-1 text-center">
                <Link href="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
                  <Link className="bg-white w-full h-full flex items-center justify-center rounded-lg cursor-pointer" href='/chatbot'>
                    Chatbot
                  </Link>
                  <Link href="/reclaim" className="w-full cursor-pointer">Scan QR</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="text-center h-full w-full flex flex-col items-center justify-center">
      <div className="w-full h-[300vh] overflow-scroll about bg-[#e0dfce] p-5 rounded-lg">
      <div className=" w-full h-[50vh] flex justify-around items-center mb-5">  
        <div className="h-[50vh] relative w-full">
          <Image
            src={"/mainLogo.png"}
            alt="notfound"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-full h-full flex bg-[#e8e6d7]  flex-col justify-center items-center rounded-xl relative overflow-hidden">
          {/* <div className=" w-72 h-72 c1 bg-green-700 absolute -left-10 -top-10"></div> */}
          {/* <div className=" w-72 h-72 c1 rounded-full bg-green-700 absolute -right-14 -bottom-10"></div> */}
          <div className="w-3/4 text-center text-4xl heading font-bold">Motivation</div>
          <div className="w-3/4 h-2/3 z-10 flex justify-center items-center  rounded-lg border-2 border-green-700">
            <p className="text-2xl">The time has past when humankind thought it could selfishly draw on resources. We know now the world is not a commodity. We have to wake up to fierce urgency of the now.</p>
          </div>
        </div>
        </div>
      <div className=" w-full h-[50vh] flex justify-around items-center mb-5">  
        <div className="h-[50vh] relative w-full">
          <Image
            src={"/a2.jpeg"}
            alt="notfound"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-full h-full bg-[#e0dfce] flex flex-col justify-center items-center rounded-xl relative overflow-hidden">
          {/* <div className=" w-72 h-72 c1 bg-green-700 absolute -left-10 -top-10"></div> */}
          {/* <div className=" w-72 h-72 c1 rounded-full bg-green-700 absolute -right-14 -bottom-10"></div> */}
          <div className="w-3/4 text-center text-4xl z-30 heading font-bold">Carbon Footprint Calculation</div>
          <div className="w-3/4 h-2/3 z-10 flex justify-center items-center  rounded-lg border-2 border-green-700">
            <p className="text-2xl">
At GreenMeter, we believe that understanding your carbon footprint is the first step towards making positive environmental changes. By inputting data related to travel, vehicle usage, food consumption, waste generation, water usage, electricity consumption, and more, our platform accurately calculates your total carbon emissions.
</p>
          </div>
        </div>
        </div>
      <div className=" w-full h-[50vh] flex justify-around items-center mb-5">  
        <div className="h-[50vh] relative w-full">
          <Image
            src={"/a3.jpeg"}
            alt="notfound"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-full h-full bg-[#b5bf96] flex flex-col justify-center items-center rounded-xl relative overflow-hidden">
          {/* <div className=" w-72 h-72 c1 bg-green-700 absolute -left-10 -top-10"></div> */}
          {/* <div className=" w-72 h-72 c1 rounded-full bg-green-700 absolute -right-14 -bottom-10"></div> */}
          <div className="w-3/4 text-center text-4xl  heading font-bold">Monthly Emission Tracking</div>
          <div className="w-3/4 h-2/3 z-10 flex justify-center items-center  rounded-lg border-2 border-green-700">
            <p className="text-2xl">We understand the importance of accountability and progress tracking. That's why we maintain detailed records of your monthly carbon emissions. Our tracking system allows you to monitor your progress over time and provides timely alerts if your emissions exceed certain thresholds, helping you stay on track towards your sustainability goals.</p>
          </div>
        </div>
        </div>
      <div className=" w-full h-[50vh] flex justify-around items-center mb-5">  
        <div className="h-[50vh] relative w-full">
          <Image
            src={"/a4.jpeg"}
            alt="notfound"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-full h-full bg-[#e8e6d7] flex flex-col justify-center items-center rounded-xl relative overflow-hidden">
          {/* <div className=" w-72 h-72 c1 bg-green-700 absolute -left-10 -top-10"></div> */}
          {/* <div className=" w-72 h-72 c1 rounded-full bg-green-700 absolute -right-14 -bottom-10"></div> */}
          <div className="w-3/4 text-center text-4xl heading font-bold">Feedback Section</div>
          <div className="w-3/4 h-2/3 z-10 flex justify-center items-center  rounded-lg border-2 border-green-700">
            <p className="text-2xl">We value your feedback and believe that sharing experiences fosters learning and improvement. Our feedback section provides a platform for users to share their experiences with carbon tracking and offer insights into how it has helped them in their journey towards sustainability. Your feedback helps us continually refine and enhance our platform to better serve you.</p>
          </div>
        </div>
        </div>
      <div className=" w-full h-[50vh] flex justify-around items-center mb-5">  
        <div className="h-[50vh] relative w-full">
          <Image
            src={"/a5.jpeg"}
            alt="notfound"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-full h-full bg-[#e0dfce]  flex flex-col justify-center items-center rounded-xl relative overflow-hidden">
          {/* <div className=" w-72 h-72 c1 bg-green-700 absolute -left-10 -top-10"></div> */}
          {/* <div className=" w-72 h-72 c1 rounded-full bg-green-700 absolute -right-14 -bottom-10"></div> */}
          <div className="w-3/4 text-center text-4xl heading font-bold"> Real-Time Support with Chatbot</div>
          <div className="w-3/4 h-2/3 z-10 flex justify-center items-center  rounded-lg border-2 border-green-700">
            <p className="text-2xl">Got questions about carbon emissions or sustainability? Our chatbot is here to help! Whether you're curious about eco-friendly lifestyle choices, need assistance navigating the app, or have specific inquiries about carbon calculations, our chatbot provides real-time answers and support to help you make informed decisions.</p>
          </div>
        </div>
        </div>
      <div className=" w-full h-[50vh] flex justify-around items-center mb-5">  
        <div className="h-[50vh] relative w-full">
          <Image
            src={"/a6.jpeg"}
            alt="notfound"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-full h-full bg-[#b5bf96] flex flex-col justify-center items-center rounded-xl relative overflow-hidden">
          {/* <div className=" w-72 h-72 c1 bg-green-700 absolute -left-10 -top-10"></div> */}
          {/* <div className=" w-72 h-72 c1 rounded-full bg-green-700 absolute -right-14 -bottom-10"></div> */}
          <div className="w-3/4 text-center text-4xl heading font-bold"> FAQs Section:</div>
          <div className="w-3/4 h-2/3 z-10 flex justify-center items-center  rounded-lg border-2 border-green-700">
            <p className="text-2xl">Have burning questions about carbon emissions and sustainability practices? Check out our comprehensive FAQs section for answers to common queries. From understanding carbon offsetting to tips for reducing your ecological footprint, we've got you covered with informative resources to support your sustainability journey.</p>
          </div>
        </div>
        </div>
      </div>
        <div className="my-8">
        At GreenMeter, we're passionate about empowering individuals to make a positive impact on the planet. Join us in our mission to create a more sustainable future, one carbon footprint at a time.
        </div>
      </section>
    </div>
  );
}
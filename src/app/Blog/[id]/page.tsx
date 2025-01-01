import React from 'react';
import { Bebas_Neue } from "next/font/google";
import { Merriweather } from "next/font/google";
import { client } from "@/sanity/lib/client";
import { Adamina } from "next/font/google";
import { Button } from '@/components/ui/button';
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa";


const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ['latin'],
});

const adamine = Adamina({
  weight: "400",
  subsets: ['latin'],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ['latin'],
});

type BlogParams = {
  params: {
    id:string;
  };
};

 async function getBlogById(id: string) {

  const blogData = await client.fetch(`*[_type == 'blog' && _id == $id] { _id, title, description }`, { id });

  return blogData[0] //get only index we want to return single object not array
 }

 




// Using `any` because specifying types causes issues with the `.next` folder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function Blog({ params }:BlogParams| any) {

  const blogData = await getBlogById(params.id); // Fetch blog data using the `id` from URL
  return (
    //must render on Url
    <div className="flex flex-col justify-between items-center ">
        <div className="flex justify-center items-center px-4 md:py-0 py-4 flex-col w-full bg-slate-300 ">     
      <h1 className='text-[60px] drop-shadow-[4px_2px_0px_rgba(0,0,0,0.9)] text-white'style={bebasNeue.style}>Dwell Days</h1>
      <p style={merriweather.style} className='md:text-[20px] text-[16px] text-center drop-shadow-[3px_1px_0px_rgba(0,0,0,0.9)] text-white'>Get to see blogs that match your taste</p>
    </div>
    <div className="py-20 px-5 xl:px-0">
      <div className=" py-10 flex justify-center items-start px-4  flex-col w-auto border-black border-[2px] border-solid shadow-[8px_8px_0px_rgba(0,0,0,0.25)]">
        <h1 className="md:text-[100px] text-[80px]" style={bebasNeue.style}>
          {blogData.title}
        </h1>
        <p style={adamine.style} className="md:text-[18px] text-[16px] xl:w-[1000px]  w-auto ">
          {blogData.description}
        </p>
      </div>
      </div>
      <div className='w-full py-[20px] flex justify-center items-center'>
    <Button variant="outline" size="lg2" className=" border-black drop-shadow-[2px_2px_0px_rgba(0,0,0,0.25)]  text-gray-800 active:translate-y-[2px] active:drop-shadow-none "  ><Link href="./" className='flex justify-between items-center w-full md:px-8 px-4' ><FaArrowLeft /> Go Back</Link>
     </Button>
     </div>
    </div>
  );
}

export default Blog

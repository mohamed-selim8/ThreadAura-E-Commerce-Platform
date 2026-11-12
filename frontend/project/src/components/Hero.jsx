import hero from "../assets/frontend_assets/hero_img.png";

import { motion } from "framer-motion";
function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="px-4"
    >
      {/* title left&right */}
      <div className="border border-gray-300 grid grid-cols-1 sm:grid-cols-2">
        {/* left side */}
        <div
          className="  py-10 sm:py-0 flex justify-center items-center 
        "
        >
          <div className="text-[#414141]">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-0.5 bg-[#414141] "></p>
              <p className=" font-medium uppercase text-sm md:text-base">
                our bestsekkers
              </p>
            </div>
            <div>
              <p className="prata-regular capitalize text-3xl py-2 sm:py-3 lg:text-5xl leading-relaxed">
                latest arrivals
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className=" font-semibold uppercase text-sm ">shop now</p>
              <p className="w-8 md:w-11 h-px bg-[#414141] "></p>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="">
          <img
            src={hero}
            className="w-full object-fill sm:object-fill    "
            alt=""
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Hero;

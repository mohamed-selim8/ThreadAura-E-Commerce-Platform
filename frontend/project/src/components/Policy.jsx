import { assets } from "../assets/frontend_assets/assets";
import Title from "./Title";
import { motion } from "framer-motion";

function Policy() {
  const { exchange_icon, quality_icon, support_img } = assets;
  return (
    <section>
      <Title>
        <div className="text-center my-12 px-4 ">
          <p className="text-gray-500 mb-3 text-3xl gap-2 inline-flex capitalize relative">
            our
            <span className="text-gray-700 font-medium ">Policy</span>
            <span className="bg-gray-700 w-5 sm:w-12 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-17%] sm:right-[-45%] "></span>
          </p>
          <p className="text-gray-600 w-3/4 mx-auto text-xs sm:text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            cupiditate eligendi ducimus aspernatur exercitationem ipsa amet
            sequi ad explicabo at.
          </p>
        </div>
      </Title>

      {/* services */}
      <div className="grid grid-cols-1 sm:grid-cols-3 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <img src={exchange_icon} className="w-12 mx-auto mb-5" alt="" />
          <p className="font-semibold capitalize">easy exchange policy</p>
          <p className="text-gray-400">We offer hassel free exchange policy.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center my-9 sm:my-0"
        >
          <img src={quality_icon} className="w-12 mx-auto mb-5" alt="" />
          <p className="font-semibold capitalize">7 days return policy</p>
          <p className="text-gray-400">We provide 7 days free return policy</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <img src={support_img} className="w-12 mx-auto mb-5" alt="" />
          <p className="font-semibold capitalize">best customer support</p>
          <p className="text-gray-400">We provide24/ 7 customer support</p>
        </motion.div>
      </div>
    </section>
  );
}

export default Policy;

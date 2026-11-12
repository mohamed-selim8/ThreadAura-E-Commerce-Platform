import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import Subscribe from "../components/Subscribe";
function Contact() {
  const { contact_img } = assets;
  return (
    <div  className="p-4">
      <div>
        <Title>
          <div className=" my-10 p-5 text-center md:p-10 ">
            <p className="text-gray-500 mb-3 text-lg sm:text-3xl gap-2 inline-flex capitalize relative">
              contact
              <span className="text-gray-700 font-medium ">us</span>
              <span className="bg-gray-700 sm:block w-6 sm:w-10 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-30%] sm:right-[-30%] "></span>
            </p>
          </div>
        </Title>
      </div>
      <div className=" my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={contact_img} className=" w-full md:max-w-120" alt="" />
        <div className="flex flex-col justify-center sm:items-baseline items-center  gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className=" text-gray-500">
            zagazig station <br />
            suite 350, washington, EGY
          </p>
          <p className=" text-gray-500">
            Tel: (+20)1140321164 <br />
            Email: mohamed.selim.fe@gmail.com
          </p>
          <p className=" text-gray-600 font-semibold text-xl">
            Careers at Forever
          </p>
          <p className=" text-gray-600 font-semibold text-xl">
          </p>
          <p className=" text-gray-500  text-center ">
            Learn more about our teams and job openings.
          </p>
          <button
            type="button"
            className="border rounded border-black py-4 text-sm px-8 hover:bg-black hover:text-white transition-all duration-500"
          >
            Explore jobs
          </button>
        </div>
      </div>

      <Subscribe />
    </div>
  );
}

export default Contact;

import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
function About() {
  const { about_img } = assets;
  return (
    <div>
      <div>
        <Title>
          <div className="text-center my-10 ">
            <p className="text-gray-500 mb-3 text-lg sm:text-3xl gap-2 inline-flex capitalize relative">
              About
              <span className="text-gray-700 font-medium ">us</span>
              <span className="bg-gray-700 hidden  sm:block w-6 sm:w-10 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-40%] sm:right-[-42%] "></span>
            </p>
          </div>
        </Title>
      </div>
      <div className="my-10 p-5 md:p-10 flex  flex-col md:flex-row md:items-center gap-16">
        <img src={about_img} className="w-full md:max-w-112.5" alt="" />
        <div>
          <p className="text-gray-500">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p className="text-gray-500">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <p className="text-gray-500">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p className="text-gray-500">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
        </div>
      </div>

      {/* why us */}
      <Title>
        <div className=" my-10 p-5 md:p-10 ">
          <p className="text-gray-500 mb-3 text-lg sm:text-3xl gap-2 inline-flex capitalize relative">
            Why
            <span className="text-gray-700 font-medium ">choose us</span>
            <span className="bg-gray-700 sm:block w-6 sm:w-10 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-30%] sm:right-[-30%] "></span>
          </p>
        </div>
      </Title>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 p-5 md:p-10">
        <div className="border py-11 shadow-lg flex flex-col items-center justify-center  border-gray-200">
          <div>
            <strong>Quality Assurance:</strong>
            <br />
            <p className="max-w-70  mt-5 text-gray-500">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
        </div>
        <div className="border py-11 shadow-lg flex flex-col items-center justify-center  border-gray-200">
          <div>
            <strong>Convenience:</strong>
            <br />
            <p className="max-w-70  mt-5 text-gray-500">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
        </div>
        <div className="border py-11 shadow-lg flex flex-col items-center justify-center  border-gray-200">
          <div>
            <strong>Exceptional Customer Service:</strong>
            <br />
            <p className="max-w-70  mt-5 text-gray-500">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

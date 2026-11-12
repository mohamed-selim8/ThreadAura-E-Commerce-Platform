import logo from "../assets/frontend_assets/logo.png";
import { Link } from "react-router";
function Footer() {
  return (
    <section className="px-4 mt-30 border border-gray-300 py-4 overflow-hidden wrap-break-word ">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className=" flex flex-col justify-center items-center">
          <img src={logo} className="w-30 mb-4" alt="" />
          <p className="w-full  md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
            itaque ab voluptate rerum similique accusamus.
          </p>
        </div>
        <div className="text-center">
          <p className="text-xl uppercase font-medium mb-5">company</p>
          <ul className="list-none flex flex-col gap-1">
            <Link className="capitalize text-gray-600">home</Link>
            <Link className="capitalize text-gray-600">about us</Link>
            <Link className="capitalize text-gray-600">delivery</Link>
            <Link className="capitalize text-gray-600">privacy policy</Link>
          </ul>
        </div>
        <div className="text-center">
          <p className="text-xl capitalize font-medium mb-5">get in touch</p>
          <ul className="list-none flex text-gray-600 flex-col gap-1">
            <li>+201140321164</li>
            <li>mohamed.selim.fe@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="text-gray-300 my-1" />
        <p className="py-5 text-sm text-center capitalize">
          copyright 2026@ forever.com - all right reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;

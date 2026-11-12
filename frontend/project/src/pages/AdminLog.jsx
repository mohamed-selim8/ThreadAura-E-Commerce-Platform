import { assets } from "../assets/frontend_assets/assets";

function AdminLog({ propInfo }) {
  let { contact_img } = assets;
  const { setInfo, handelAdmin, adminInfo } = propInfo;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="shadow-md bg-white rounded-lg px-8 py-6 w-full h-screen flex flex-col items-center justify-center gap-3.5  ">
        <h1 className="font-bold text-2xl mb-4 text-center">Admin Login</h1>
        <form
          onSubmit={handelAdmin}
          className="flex flex-col gap-5 items-center"
        >
          <div>
            <input
              value={adminInfo.email}
              onChange={(e) => {
                setInfo({ ...adminInfo, email: e.target.value });
              }}
              type="email"
              placeholder="email"
              name="email"
              className="border border-gray-300  px-3 py-2 outline-none w-full sm:w-100 rounded-md "
            />
          </div>
          <div>
            <input
              onChange={(e) => {
                setInfo({ ...adminInfo, password: e.target.value });
              }}
              value={adminInfo.password}
              type="password"
              placeholder="password"
              name="password"
              className="border border-gray-300 px-3 py-2 outline-none w-full sm:w-100 rounded-md "
            />
          </div>
          <input
            type="submit"
            value={"Login"}
            className="border border-gray-300 w-full px-3 py-2 outline-none sm:w-100 rounded-md cursor-pointer bg-black text-white hover:bg-black/65 "
          />
        </form>
      </div>
      <div>
        <img src={contact_img} className="h-screen w-full object-cover " alt="" />
      </div>
    </div>
  );
}

export default AdminLog;

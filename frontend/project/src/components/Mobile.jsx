import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
// logo
import Logo from "../assets/frontend_assets/logo.png";

import { useLocation } from "react-router";

function Mobile({ opens }) {
  let { pathname } = useLocation();

  let { open, setOpen } = opens;

  //   mobile links
  const navLinks = [
    {
      nav: "home",
      path: "/",
    },
    {
      nav: "collection",
      path: "/collection",
    },
    {
      nav: "about",
      path: "/about",
    },
    {
      nav: "contact",
      path: "/contact",
    },
  ];
  return (
    <div className="md:hidden">
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50  "
              onClick={() => setOpen(false)}
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.5,
              }}
              className="fixed top-0 right-0 z-50 h-full w-full sm:w-96 bg-white shadow-2xl "
            >
              <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center capitalize cursor-pointer gap-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                    onClick={() => setOpen(false)}
                  >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                    <span>back</span>
                  </motion.button>

                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    src={Logo}
                    alt="logo"
                    className="w-30 h-30 object-contain"
                  />
                </div>

                {/* Menu Items with Stagger Animation */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                  className="flex-1 space-y-4"
                >
                  {navLinks.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: -30,
                          scale: 0.95,
                        },
                        visible: {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                          transition: {
                            type: "spring",
                            damping: 20,
                            stiffness: 200,
                          },
                        },
                      }}
                      whileHover={{
                        scale: 1.02,
                        x: 10,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                      className={`p-4 capitalize  ${pathname == item.path ? "bg-black text-white" : "bg-gray-50"} rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200 `}
                    >
                      <Link
                        to={item.path}
                        onClick={() =>
                          setTimeout(() => {
                            setOpen(false);
                          }, 1000)
                        }
                      >
                        {item.nav}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer with animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-auto pt-4 border-t border-gray-200"
                >
                  <p className="text-sm text-gray-500">
                    © 2026 All rights reserved
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Mobile;

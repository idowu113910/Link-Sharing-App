import React, { useState } from "react";
import dev from "../assets/dev.png";
import link from "../assets/links.png";
import profile from "../assets/profile-details.png";
import preview from "../assets/preview.png";
import dev2 from "../assets/devlink.png";
import { HiLink } from "react-icons/hi";
import { LuCircleUserRound } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";


const NavBar = () => {
  const location = useLocation();

  // Check which page is active
  const isLinksPage = location.pathname === "/" || location.pathname === "/";
  const isProfilePage = location.pathname === "/profiledetails";

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState("");

  // Check which page is active

  // Handle navigation with loading state
  const handleNavigate = (route) => {
    setIsLoading(true);
    setLoadingRoute(route);

    // Simulate loading delay
    setTimeout(() => {
      navigate(route);
      setIsLoading(false);
      setLoadingRoute("");
    }, 1500); // 500ms delay
  };

  return (
    <>
      <div className="flex gap-[8px] justify-between px-[16px] py-[24px] block md:hidden relative">
        <img src={dev} alt="" className="w-[32px] h-[32px]" />
        <div className="flex mx-auto gap-[8px]">
          {/* Links Icon */}
          <div className="relative">
            <div
              className={`py-[11px] px-[27px] rounded-[8px] cursor-pointer transition-all ${
                isLinksPage
                  ? "bg-[#EFEBFF] border-[1px] border-[#633CFF] rounded-[8px] w-[74px] h-[42px]"
                  : "bg-transparent"
              } ${isLoading && loadingRoute === "/" ? "opacity-50" : ""}`}
              onClick={() => !isLoading && handleNavigate("/")}
            >
              <HiLink
                className={`w-[20px] h-[20px] ${
                  isLinksPage ? "text-[#633CFF]" : "text-[#737373]"
                }`}
              />
            </div>
            {isLoading && loadingRoute === "/" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-[#633CFF] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <div
              className={`py-[11px] px-[27px] rounded-[8px] cursor-pointer transition-all ${
                isProfilePage
                  ? "bg-[#EFEBFF] border-[1px] border-[#633CFF]  rounded-[8px] w-[74px] h-[42px]"
                  : "bg-transparent"
              } ${
                isLoading && loadingRoute === "/profiledetails"
                  ? "opacity-50"
                  : ""
              }`}
              onClick={() => !isLoading && handleNavigate("/profiledetails")}
            >
              <LuCircleUserRound
                className={`w-[20px] h-[20px] ${
                  isProfilePage ? "text-[#633CFF]" : "text-[#737373]"
                }`}
              />
            </div>
            {isLoading && loadingRoute === "/profiledetails" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-[#633CFF] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <Eye
            alt=""
            className={`cursor-pointer transition-opacity mt-0.5 mr-3 border-[1px] border-[#633CFF] w-[52px] h-[42px] rounded-[8px] py-[11px] px-[16px] text-[#633CFF] ${
              isLoading && loadingRoute === "/preview" ? "opacity-50" : ""
            }`}
            onClick={() => !isLoading && handleNavigate("/preview")}
          />
          {isLoading && loadingRoute === "/preview" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-[#633CFF] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* iPad and Desktop Navbar */}
      <div className="hidden md:block">
        <div className="flex gap-[8px] justify-between pr-[16px] pl-[24px] py-[16px] lg:p-[24px] w-[720px] lg:w-[1352px] lg:overflow-x-hidden mt-4">
          <img
            src={dev2}
            alt=""
            className="w-[146px] h-[32px] mt-1 ml-4 md:ml-2 lg:ml-4"
          />

          <div className="lg:items-center lg:justify-center lg:flex md:flex md:w-[309px] lg:w-[325px] md:gap-8 lg:gap-[16px] lg:mr-6 mt-1">
            {/* Links Tab */}
            <div
              onClick={() => !isLoading && handleNavigate("/")}
              className={`flex rounded-[8px] w-[122px] h-[46px] gap-[8px] py-[11px] px-[27px] cursor-pointer transition-colors ml-3 ${
                isLinksPage
                  ? "bg-[#EFEBFF] text-[#633CFF]"
                  : "bg-transparent text-[#737373] hover:text-[#633CFF]"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <HiLink className="w-[20px] h-[20px] mt-0.5" />
              <p className="text-[16px] font-semibold">
                {isLoading && loadingRoute === "/" ? "Loading..." : "Links"}
              </p>
            </div>

            {/* Profile Details Tab */}
            <div
              onClick={() => !isLoading && handleNavigate("/profiledetails")}
              className={`flex gap-[8px] text-center items-center font-semibold cursor-pointer transition-colors rounded-[8px] w-[187px] h-[46px] py-[16px] px-[27px] ${
                isProfilePage
                  ? "bg-[#EFEBFF] text-[#633CFF]"
                  : "bg-transparent text-[#737373] hover:text-[#633CFF]"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <LuCircleUserRound className="w-[16.88px] h-[16.88px]" />
              <p className="font-semibold text-[16px] w-[105px]">
                {isLoading && loadingRoute === "/profiledetails"
                  ? "Loading..."
                  : "Profile Details"}
              </p>
            </div>
          </div>

          <button
            onClick={() => !isLoading && handleNavigate("/preview")}
            disabled={isLoading}
            className="w-[114px] h-[46px] rounded-[8px] border-[1px] border-[#633CFF] py-[11px] px-[27px] text-[#633CFF] text-[16px] font-semibold ml-8 lg:mr-4 mt-1 hover:bg-[#EFEBFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-16"
          >
            {isLoading && loadingRoute === "/preview"
              ? "Loading..."
              : "Preview"}
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;

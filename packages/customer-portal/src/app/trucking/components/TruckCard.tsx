import React from "react";

const Stepper = ({ pickupCity, dropCity, transportCharges }: any) => {
  return (
    <>
      {/* TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com */}
      <div className=" w-full mt-4">
        <div className="flex-center w-full">
          <div className="w-2 h-2 rounded-full bg-black shadow-2xl" />
          <div className="w-2/4 h-1 border-b border-gray-500" />
          <div className="w-2 h-2 rounded-full bg-black shadow-2xl" />
        </div>
        <div className="w-full flex justify-evenly items-center mt-2">
          <p className="text-xs text-gray-500 paragraph-medium">{pickupCity}</p>
          <p className="text-xs text-gray-500 paragraph-medium">{dropCity}</p>
        </div>
      </div>
    </>
  );
};

function TruckCard({ pickupCity, dropCity, transportCharges }: any) {
  return (
    <div className="relative mt-8 flex justify-evenly items-center max-w-2xl rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      <div className="relative mx-4 md:w-1/3 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
        <img src="images/truck.jpg" alt="truck" />
        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
        <button
          className="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
            </svg>
          </span>
        </button>
      </div>
      <div className="p-4 w-4/6">
        <div className="flex flex-col items-center justify-between mb-3">
          <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
            Truck 8 Tonne(s) (LTL)
          </h5>

          <p className="text-small paragraph-medium text-orange-500">
            TS 12 UD 6775
          </p>

          <Stepper pickupCity={pickupCity} dropCity={dropCity} />
        </div>

        <div className="p-6">
          <button
            className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Reserve @ ${transportCharges} per tone
          </button>
        </div>
      </div>
    </div>
  );
}

export default TruckCard;

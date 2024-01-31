"use client";
import React from "react";
import SearchBar from "./SearchBar";
import TruckCard from "./TruckCard";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "FTL", label: "FTL" },
      { value: "LTL", label: "LTL" },
    ],
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function Hero() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [truckData, setTruckData] = useState([]);
  return (
    <section>
      <div className="relative bg-orange-500">
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-white"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
              Where Logistics Meets Convenience
              <br className="hidden md:block" />
              Your Trusted{" "}
              <span className="relative inline-block px-2">
                <div className="absolute inset-0 transform -skew-x-12 bg-teal-accent-400" />
                <span className="relative text-teal-900">
                  Truck Booking Partner.
                </span>
              </span>
            </h2>
            <SearchBar setTruckData={setTruckData} />
            <div className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16"></div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4">
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.name}
                          className="border-t border-gray-200 pb-4 pt-4"
                        >
                          {({ open }) => (
                            <fieldset>
                              <legend className="w-full px-2">
                                <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                  <span className="text-sm font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex h-7 items-center">
                                    <ChevronDownIcon
                                      className={classNames(
                                        open ? "-rotate-180" : "rotate-0",
                                        "h-5 w-5 transform"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Disclosure.Button>
                              </legend>
                              <Disclosure.Panel className="px-4 pb-2 pt-4">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`${section.id}-${optionIdx}-mobile`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`${section.id}-${optionIdx}-mobile`}
                                        className="ml-3 text-sm text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </fieldset>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="pt-10 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside>
                <h2 className="sr-only">Filters</h2>

                <button
                  type="button"
                  className="inline-flex items-center lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="text-sm font-medium text-gray-700">
                    Filters
                  </span>
                  <PlusIcon
                    className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </button>

                <div className="hidden lg:block">
                  <form className="space-y-10 divide-y divide-gray-200">
                    {filters.map((section, sectionIdx) => (
                      <div
                        key={section.name}
                        className={sectionIdx === 0 ? "" : "pt-10"}
                      >
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">
                            {section.name}
                          </legend>
                          <div className="space-y-3 pt-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    ))}
                  </form>
                </div>
              </aside>

              {/* Product grid */}
              <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                {truckData?.map((truck: any) => {
                  return (
                    <TruckCard
                      key={truck.id}
                      pickupCity={truck.pickupcity}
                      dropCity={truck.dropcity}
                      transportCharges={truck.transportcharges}
                    />
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

export default Hero;

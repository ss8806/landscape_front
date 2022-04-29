import { Menu, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";

const DropdownLink = ({ children, ...props }: any) => (
  <Menu.Item>
    {({ active }: any) => (
      <NavLink
        {...props}
        className={`w-full text-left block px-4 
      py-2 text-sm leading-5 text-gray-700 ${({ isActive }: any) =>
        isActive
          ? "bg-gray-100"
          : ""} focus:outline-none transition duration-150 ease-in-out`}
      >
        {children}
      </NavLink>
    )}
  </Menu.Item>
);

export const DropdownButton = ({ children, ...props }: any) => (
  <Transition
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0"
  >
    <Menu.Item>
      {({ active }: any) => (
        <button
          className={`w-full text-left block px-4 py-2 
        text-sm leading-5 text-gray-700 ${active ? "bg-gray-100" : ""}
         focus:outline-none transition duration-150 ease-in-out`}
          {...props}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  </Transition>
);

export default DropdownLink;

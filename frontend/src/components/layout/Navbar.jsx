import React from "react";
import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-80">
        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 w-full"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer text-gray-600" />

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h3 className="font-semibold text-sm">
              John Doe
            </h3>

            <p className="text-xs text-gray-500">
              Employee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
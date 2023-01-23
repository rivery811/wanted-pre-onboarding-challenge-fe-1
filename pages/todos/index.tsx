import React from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
const Todos = () => {
  return (
    <div className="container  w-full">
      <div className="fixed w-full bg-slate-200 p-2 z-index-50 flex justify-between">
        <div>갓생을 위한 Todos</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <FaceSmileIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Todos;

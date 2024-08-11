import { memo } from "react";

const Pagination = memo(() => {
  return (
    <div className="flex justify-between my-4 w-full">
      {["prev", "next"].map((name) => (
        <div key={name} className="capitalize border px-2 py-1 rounded-md bg-blue-500 text-white ">
          <button className="capitalize" type="button">{name}</button>
        </div>
      ))}
    </div>
  );
});

export default Pagination;

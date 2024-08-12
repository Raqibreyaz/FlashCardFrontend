import { memo } from "react";

interface stateInterface {
  pageIndex: number;
  setPageIndex: Function;
  noOfPages: number;
}

const Pagination = memo(
  ({ pageIndex, setPageIndex, noOfPages }: stateInterface) => {

    return (
      <div className="flex justify-between my-4 w-full px-4">
        {[
          {
            name: "prev",
            onClick: () => {
              if (pageIndex > 0) setPageIndex(pageIndex - 1);
            },
          },
          {
            name: "next",
            onClick: () => {
              if (pageIndex < noOfPages) setPageIndex(pageIndex + 1);
            },
          },
        ].map((button) => (
          <div
            key={button.name}
            className="capitalize border px-4 py-1 rounded-md bg-blue-500 text-white "
          >
            <button
              className="capitalize font-semibold"
              type="button"
              {...button}
            >
              {button.name}
            </button>
          </div>
        ))}
      </div>
    );
  }
);

export default Pagination;

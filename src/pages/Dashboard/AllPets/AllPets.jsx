import usePets from "../../../hooks/usePets";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
const AllPets = () => {
  const [pets, , refetch] = usePets();
  const axiosSecure = useAxiosSecure();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const columnHelper = createColumnHelper();

  const data = useMemo(() => pets, [pets]);
  const handleDelete = (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/pets/${id}`);
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Pet has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  // const handleUpdate = (id) => {
  //   console.log(id);
  // };
  const handleAdopt = async (id) => {
    // console.log(id);

    // const res = await axiosSecure.patch(`/pets/${id}`, { adopted: true });
    // console.log(res.data);
    // if (res.data.modifiedCount > 0) {
    //   refetch();
    // }
    axiosSecure.patch(`/pet/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "adopted",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "pet Already adopted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // const columns = [
  //   {
  //     header: "Serial",
  //     accessorKey: "_id",
  //   },
  //   {
  //     header: "Image",
  //     accessorKey: "image",
  //   },
  //   {
  //     header: "name",
  //     accessorKey: "name",
  //   },
  //   {
  //     header: "Location",
  //     accessorKey: "location",
  //   },
  //   {
  //     header: "date",
  //     accessorKey: "date",
  //   },
  // ];
  const columns = [
    columnHelper.accessor("", {
      id: "S.no",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "Serial Num",
    }),

    columnHelper.accessor("image", {
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="..."
          className="rounded-full w-10 h-10 object-cover"
        />
      ),
    }),
    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,

      header: "Category",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,

      header: "Name",
    }),
    columnHelper.accessor("adopted", {
      cell: (info) => (
        <span>{info.getValue() == false ? "Not Adopted" : "Adopted"}</span>
      ),

      header: "Status",
    }),
    columnHelper.accessor("_id", {
      // id: "S.no",
      cell: (info) => (
        <div>
          <Link to={info?.getValue()}>
            <button
            //  onClick={() => handleUpdate(info?.getValue())}
            >
              <FaPen></FaPen>
            </button>
          </Link>
          <button
            className="text-red-500 md:mx-2"
            onClick={() => handleDelete(info?.getValue())}
          >
            <FaTrash></FaTrash>
          </button>
          <button
            className="btn-sm bg-primary rounded-xl"
            onClick={() => handleAdopt(info?.getValue())}
          >
            Adopt
          </button>
        </div>
      ),
      header: "Action",
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="space-y-3">
      <h2 className="font-bold text-center">
        Total number of pets: {pets.length}
      </h2>
      <div className="flex justify-center ">
        <h2 className="text-xl font-bold mr-2">Search:</h2>
        <input
          className="border-secondary border mb-4 rounded-md p-2"
          type="text"
          value={filtering}
          placeholder="Search your Pet"
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <div className="w3-container">
        <table className="w3-table-all">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          { asc: "🔼", desc: "🔽" }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={index}>
                {row.getVisibleCells().map((cell, idx) => (
                  <td key={idx}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm">
          You can click on image/category/name/status to sort
        </p>
        {data?.length > 10 && (
          <div className="mt-5">
            <button
              className="btn-sm btn btn-secondary"
              onClick={() => table.setPageIndex(0)}
            >
              First page
            </button>
            <button
              className="btn-sm btn btn-primary"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Previous page
            </button>
            <button
              className="btn-sm btn btn-primary"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next page
            </button>
            <button
              className="btn-sm btn btn-secondary"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              Last page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPets;

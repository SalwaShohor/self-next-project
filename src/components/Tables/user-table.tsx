"use-client";
import { TrashIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { getUserTableData } from "./fetch";
import { DownloadIcon, PreviewIcon } from "./icons";

export async function UserTable() {
  const data = await getUserTableData();

  return (
    <div className="rounded-[10px] p-4 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">Full Name</TableHead>
            <TableHead>IC Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="border-[#eee] dark:border-dark-3">
              <TableCell className="min-w-[155px] xl:pl-7.5">
                {/* <h5 className="text-dark dark:text-white">{item.name}</h5> */}
                <p className="text-dark dark:text-white">{item.fullName}</p>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">{item.icNumber}</p>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">{item.email}</p>
                {/* <div
                  className={cn(
                    "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                    {
                      "bg-[#219653]/[0.08] text-[#219653]":
                        item.status === "Paid",
                      "bg-[#D34053]/[0.08] text-[#D34053]":
                        item.status === "Unpaid",
                      "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                        item.status === "Pending",
                    },
                  )}
                >
                  {item.status}
                </div> */}
              </TableCell>

              <TableCell className="xl:pr-7.5">
                {/* <div className="flex items-center justify-end gap-x-3.5">
                  <button className="hover:text-primary">
                    <span className="sr-only">View Invoice</span>
                    <PreviewIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Delete Invoice</span>
                    <TrashIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Download Invoice</span>
                    <DownloadIcon />
                  </button>
                </div> */}
                <p className="text-dark dark:text-white">{item.role}</p>
              </TableCell>
              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-start gap-x-3.5">
                  <button className="hover:text-primary">
                    <span className="sr-only">View Invoice</span>
                    <PreviewIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Delete Invoice</span>
                    <TrashIcon />
                  </button>

                  {/* <button className="hover:text-primary">
                    <span className="sr-only">Download Invoice</span>
                    <DownloadIcon />
                  </button> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

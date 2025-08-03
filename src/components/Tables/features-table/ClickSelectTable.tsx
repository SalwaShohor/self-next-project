import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ClickSelectTable() {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      {/* <h2 className="px-4 py-6 text-2xl font-bold text-dark dark:text-white md:px-6 xl:px-9">
        Behavior: Navigation
      </h2> */}

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead>Features</TableHead>
            <TableHead>ANTV-G6</TableHead>
            <TableHead>Sigma</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              <span className="text-black">Click Select</span>
            </TableCell>
            <TableCell>✅</TableCell>
            <TableCell>❌</TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell>
              <span className="text-black">Zoom Canvas</span>
            </TableCell>
            <TableCell>✅</TableCell>
            <TableCell>✅</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="text-black">Scroll Canvas</span>
            </TableCell>
            <TableCell>✅</TableCell>
            <TableCell>✅</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="text-black">Optimize Viewport Transform</span>
            </TableCell>
            <TableCell>✅</TableCell>
            <TableCell>❌</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}

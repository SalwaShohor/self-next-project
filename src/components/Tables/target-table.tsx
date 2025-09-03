"use client";
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
import { getTargetTableData } from "./fetch";
import { DownloadIcon, PreviewIcon } from "./icons";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "@/components/popup/ConfirmationModal";
import SuccessModal_2 from "@/components/popup/SuccessModal_2";

interface Target {
  _id: string;
  icNumber: string;
  fullName: string;
  age: number;
  birthDate: string;
  currentAddress: string;
}

export default function TargetTable() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null); // Track the selected target
  // const data = await getTargetTableData();
  const [targets, setTargets] = useState<Target[]>([]);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const res = await axios.get(
          // `${process.env.NEXT_PUBLIC_API_URL}/api/target/all-target`,
          `${process.env.NEXT_PUBLIC_API_URL}/api/target/all-target`,
        );
        setTargets(res.data);
      } catch (error) {
        console.error("Failed to fetch targets:", error);
      }
    };

    fetchTargets();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/target/delete/${id}`,
      );
      // Refresh table after delete
      setTargets((prev) => prev.filter((t) => t._id !== id));
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to delete target:", error);
    }
  };

  const handleDeleteClick = (target: Target) => {
    setSelectedTarget(target); // Save which target user clicked delete
    setShowConfirmationModal(true);
  };

  const handleConfirmYes = async () => {
    if (!selectedTarget) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/target/delete-by-ic/${selectedTarget.icNumber}`,
      );

      // Remove from table immediately
      setTargets((prev) =>
        prev.filter((t) => t.icNumber !== selectedTarget.icNumber),
      );

      setShowConfirmationModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Failed to delete target:", err);
      setShowConfirmationModal(false);
    }
  };

  const handleConfirmNo = () => {
    setShowConfirmationModal(false);
    setSelectedTarget(null);
  };

  const handleSuccessOk = () => {
    setShowSuccessModal(false);
    setSelectedTarget(null);
  };

  return (
    <div className="rounded-[10px] dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">IC Number</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Birth Date</TableHead>
            <TableHead>Current Address</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {targets.map((item) => (
            <TableRow
              key={item._id}
              className="border-[#eee] dark:border-dark-3"
            >
              <TableCell className="min-w-[155px] xl:pl-7.5">
                {/* <h5 className="text-dark dark:text-white">{item.name}</h5> */}
                <p className="mt-[3px] text-body-sm font-medium">
                  {item.icNumber}
                </p>
              </TableCell>

              <TableCell>
                <p className="mt-[3px] text-body-sm font-medium">
                  {item.fullName}
                </p>
              </TableCell>

              <TableCell>
                <p className="mt-[3px] text-body-sm font-medium">{item.age}</p>
              </TableCell>

              <TableCell>
                <p className="mt-[3px] text-body-sm font-medium">
                  {item.birthDate}
                </p>
              </TableCell>

              <TableCell>
                <p className="mt-[3px] text-body-sm font-medium">
                  {item.currentAddress}
                </p>
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button
                    onClick={() => handleDeleteClick(item)} // Pass the current target
                    className="hover:text-primary"
                  >
                    <span className="sr-only">Delete Invoice</span>
                    <TrashIcon />
                  </button>

                  {/* Confirmation Modal */}
                  {showConfirmationModal && (
                    <ConfirmationModal
                      message={`Are you sure you want to delete ${selectedTarget?.icNumber}?`}
                      onConfirm={handleConfirmYes}
                      onCancel={handleConfirmNo}
                    />
                  )}

                  {/* Success Modal */}
                  {showSuccessModal && selectedTarget && (
                    <SuccessModal_2
                      message={`Target named "${selectedTarget.fullName}" is successfully deleted! 🎉`}
                      onClose={handleSuccessOk}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

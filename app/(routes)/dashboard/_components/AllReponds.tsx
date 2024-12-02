import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AllReponds = () => {
  return (
    <Table>
      <TableCaption>A list of your all reponses.</TableCaption>
      <TableHeader>
        <TableRow className="!h-14">
          <TableHead className="w-[100px]">ID no.</TableHead>
          <TableHead>ITem</TableHead>
          <TableHead className="text-right">Dates</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="!h-14">
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">Credit Card</TableCell>
        </TableRow>

        <TableRow className="!h-14">
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">Credit Card</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AllReponds;

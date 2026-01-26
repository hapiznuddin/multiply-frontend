"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRoomParticipantsAction } from "./action";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

interface Participant {
  id: number;
  participant_name: string;
  score: number;
}

export default function ParticipantList({ id }: { id: number }) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data } = await getRoomParticipantsAction(id);
      if (data) {
        setParticipants(data);
      }
      setLoading(false);
    };

    fetchParticipants();
    // Poll every 5 seconds to update the list
    const interval = setInterval(fetchParticipants, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const handleExport = () => {
    const dataToExport = participants.map((p, index) => ({
      Rank: index + 1,
      Name: p.participant_name,
      Score: p.score,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");
    XLSX.writeFile(workbook, "Participants.xlsx");
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Students</h2>
          <p className="text-sm text-slate-500">
            List of students in this room
          </p>
        </div>
        <Button onClick={handleExport} variant="default" className="gap-2">
          Export Excel
        </Button>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.length > 0 ? (
              participants.map((participant, index) => (
                <TableRow key={participant.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{participant.participant_name}</TableCell>
                  <TableCell className="text-right">
                    {participant.score}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No participants yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

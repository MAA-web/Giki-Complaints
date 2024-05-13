'use client'
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from "react"

export type Payment = {
    complaint_id: string
    title: string
    description: string
    hostel_number: string
    room_number: string
    complaintant_name: string
    complaintant_id: string
    phone_number: string
    status: "pending" | "processing" | "success" | "failed"
    time: string
  }

  async function handleChange(complaint_id:string, value:string) {
    fetch('/api/head/deleteComp',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        complaint_id,
      }),
    });

    fetch('/api/head/change',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        complaint_id,
        value
      }),
    });
  }

  export const columns: ColumnDef<Payment>[] = [
    { 
        accessorKey: "complaint_id",
        header: "Complaint Id",
        
    },
    { 
        accessorKey: "title",
        header: "Title",
        
    },
    {
        accessorKey: "description",
        header: "Description",
        
    },    
    {
        accessorKey: "status",
        header: "Status",
        
    },
    {
        accessorKey: "hostel_number",
        header: "Hostel Number",
        
    },
    {
        accessorKey: "room_number",
        header: "Room Number",
        
    },
    {
        accessorKey: "complaintant_name",
        header: "Complaintant Name",
        
    },
    {
        accessorKey: "complaintant_id",
        header: "Complaintant ID",
        
    },
    {
        accessorKey: "phone_number",
        header: "Phone Number",
        
    },
    {
        accessorKey: "time",
        header: "Time",
        
    },
    {
        id: "actions",
        cell: async ({ row }) => {
          const payment = row.original
          
          
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.complaint_id)}
                >
                  Copy Complaint ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => handleChange(payment.complaint_id, "pending")}
                >pending</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleChange(payment.complaint_id, "processing")}
                >processing</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleChange(payment.complaint_id, "success")}
                >success</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleChange(payment.complaint_id, "failed")}
                >failed</DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
  ]
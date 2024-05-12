'use client'
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Payment = {
    title: string
    description: string
    hostel_number: string
    room_number: string
    complainant_name: string
    complainant_id: string
    phone_number: string
    status: "pending" | "processing" | "success" | "failed"
    time: string
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
        accessorKey: "complainant_name",
        header: "Complainant Name",
        
    },
    {
        accessorKey: "complainant_id",
        header: "Complainant ID",
        
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
        cell: ({ row }) => {
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
                  onClick={() => navigator.clipboard.writeText(payment.complainant_id)}
                >
                  Copy Complainant ID
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {}}
                >Change status</DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
  ]
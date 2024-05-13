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

  export type Subheads = {
    uid: string
    name: string
    hostel: string
  }

  export const SubheadColumns: ColumnDef<Subheads>[] = [
    { 
        accessorKey: "uid",
        header: "Sub Head id",
        
    },
    { 
        accessorKey: "name",
        header: "Name",
        
    },
    {
        accessorKey: "hostel",
        header: "Hostel no",
        
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
                  onClick={() => navigator.clipboard.writeText(payment.uid)}
                >
                  Copy Sub Head ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
  ]
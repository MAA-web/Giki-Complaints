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

  export type uSubheads = {
    uid: string
    name: string
    role: string
  }

  export const uSubheadColumns: ColumnDef<uSubheads>[] = [
    { 
        accessorKey: "uid",
        header: "User id",
        
    },
    { 
        accessorKey: "name",
        header: "Name",
        
    },
    {
      accessorKey: "role",
      header: "Role",
      
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
                  Copy User ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
  ]
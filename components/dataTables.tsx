"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import axios from "axios"
   
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }
   
  export function DataTable<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [assignee, setAssignee] = useState('');


  // const handleButtonClick = () => {
  //   let assigneesData;
  //   fetch('/api/head/getAssignees', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     }).then( (response) => {
  //     assigneesData = response.json();
  //     console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + assigneesData)
  //     setAssignees(assigneesData)
  //     })
  //   console.log("Selected item:", selectedItem);
  //   console.log("Selected assignee:", assignee);
  //   // Add your logic here
  // };

  const onClickHandler = async () => {
    
    try {
      const res = await fetch('/api/head/getAssignees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const data = await res.json()
      console.log(data.hi.data)

      //await setAssignees(data.hi.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleButtonClick1 = () => {
    fetch('/api/head/getAssignees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(hi => hi.json())
    //.then(data => setAssignees(data))
    .then(response => console.log(response.data));
  }


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
  };
    //@ts-ignore
    const uniqueValues = data.map(item => ({ title: item.title, id: item.complaint_id }));


    return (
        <>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>


      <Select>
      <SelectTrigger className="">
      <SelectValue
            //@ts-ignore
            value={selectedItem || ""}
            onChange={handleSelectChange}
            placeholder="Select an item"
          />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {/* Map through unique values to create select options */}
            {uniqueValues.map((value, index) => (
              <SelectItem key={index} value={value.id}>
                {value.title + " --> Id: " + value.id}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
      </Select>


      <Select>
      <SelectTrigger className="">
      <SelectValue
            //@ts-ignore
            value={assignee || ""}
            onChange={handleSelectChange}
            placeholder="Select an item"
          />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {/* Map through unique values to create select options */}
            {Array.isArray(assignees) && assignees.map((assignee, index) => (
              <SelectItem key={index} value={assignee}>{assignee}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
      </Select>

      <Button variant={"destructive"} onClick={onClickHandler}>get subhead data</Button>
      </>
    )
  }
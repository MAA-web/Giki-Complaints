// 'use client'
// import { useState } from "react";




// export default function NForm(){

//     const [Description, setDescription] = useState('');
//     const [Title, setTitle] = useState('');
//     const [Hostel_Number, setHostel_Number] = useState('');
//     const [Room_Number, setRoom_Number] = useState('');
//     const [Complainant_Name, setComplainant_Name] = useState('');
//     const [Phone_Number, setPhone_Number] = useState('');

//     const [Complaint, setComplaint] = useState('');

//     async function createCase() {
//         const response = await fetch('/api/user/case/create',{
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 Description,
//                 Title,
//                 Hostel_Number,
//                 Room_Number,
//                 Complainant_Name,
//                 Phone_Number,
//             }),
//           });
//           const data = await response.json()
    
//           console.log(data);
    
//     }

//     const handleSubmit = async (event: { preventDefault: () => void; }) => {
//         event.preventDefault();
//         //console.log('Phone No:', PhoneNo);
//         console.log('Description:', Description);

//         await createCase();
  
//     };
      
//     return (<>

//     <h1>Create an issue</h1>
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Title:
//                 <input
//                     className="text-black"
//                     type="text"
//                     value={Title}
//                     onChange={(event) => setTitle(event.target.value)}
//                     placeholder="Enter your Title"
//                 />
//             </label>
//             <label>
//                 Description:
//                 <input
//                     className="text-black"
//                     type="text"
//                     value={Description}
//                     onChange={(event) => setDescription(event.target.value)}
//                     placeholder="Enter your Description"
//                 />
//             </label>
//             <label>
//                 Hostel_Number:
//                 <input
//                     className="text-black"
//                     type="text"
//                     value={Hostel_Number}
//                     onChange={(event) => setHostel_Number(event.target.value)}
//                     placeholder="Enter your Hostel Number"
//                 />
//             </label>

//             <label>
//                 Room_Number:
//                 <input
//                     className="text-black"
//                     type="text"
//                     value={Room_Number}
//                     onChange={(event) => setRoom_Number(event.target.value)}
//                     placeholder="Enter your Room_Number"
//                 />
//             </label>

//             <label>
//                 Complainant_Name:
//                 <input
//                     className="text-black"
//                     type="text"
//                     value={Complainant_Name}
//                     onChange={(event) => setComplainant_Name(event.target.value)}
//                     placeholder="Enter your Name"
//                 />
//             </label>


//             <label>
//                 Phone_Number:
//                 <input
//                     className="text-black"
//                     type="text"
//                     value={Phone_Number}
//                     onChange={(event) => setPhone_Number(event.target.value)}
//                     placeholder="Enter your Phone Number"
//                 />
//             </label>
//             <button type="submit">Submit</button>
//         </form>
//     </>)
// }




"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function NForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}



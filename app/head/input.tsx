'use client'

export default function Inputs() {

    const handleButtonClick = () => {
        // Access the input field values and perform some action
        const input1Value = document.getElementById("input1").value;
        const input2Value = document.getElementById("input2").value;
        fetch('/api/head/assign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                complaint_id: input1Value,
                value: input2Value
              }),
        })
        // Perform action with input values
        console.log("Input 1 value:", input1Value);
        console.log("Input 2 value:", input2Value);
  
        // Example: Update state or make an API call with input values
      };

      return(
        <>
<div className="text-black flex items-center justify-center">
  <input
    id="input1"
    type="text"
    placeholder="Type Complaint ID"
    className="border rounded-md px-4 py-2 mr-2 focus:outline-none"
  />
  <input
    id="input2"
    type="text"
    placeholder="Type Sub Head ID"
    className="border rounded-md px-4 py-2 mr-2 focus:outline-none"
  />
  <button
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none"
    onClick={handleButtonClick}
  >
    Assign
  </button>
</div>

        </>
      )
}
'use client'

export default function MakeSub() {

    const handleButtonClick = () => {
        // Access the input field values and perform some action
        //@ts-ignore
        const input1Value = document.getElementById("input1").value;
        fetch('/api/head/makesub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: input1Value,
              }),
        })
        // Perform action with input values
        console.log("Input 1 value:", input1Value);
  
        // Example: Update state or make an API call with input values
      };

      return(
        <>
<div className="text-black flex items-center justify-center">
  <input
    id="input1"
    type="text"
    placeholder="Type User ID to make SubHead"
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
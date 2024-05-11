'use client'
import React, { useState } from 'react';

export default function Lists({ data }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const handleDeselect = () => {
    setSelectedItem(null);
  };

  return (
    <ul>
      {data.map((item, index) => (
        <li
          key={index}
          onClick={() => handleSelect(item)}
          className={item === selectedItem ? 'selected' : ''}
        >
          <span>
            Role: {item.result.role} (UID: {item.result.uid})
          </span>
          {item === selectedItem && (
            <button onClick={handleDeselect}>Deselect</button>
          )}
        </li>
      ))}
    </ul>
  );
}

// import React, { useState } from 'react';

// export default function Lists({ data, onAdd, onRemove }) {
//   const [selectedItems, setSelectedItems] = useState([]);

//   const handleSelect = (item) => {
//     setSelectedItems((prevItems) => [...prevItems, item]);
//   };

//   const handleDeselect = (item) => {
//     setSelectedItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
//   };

//   const handleAdd = () => {
//     selectedItems.forEach((item) => onAdd(item.result.uid));
//     setSelectedItems([]);
//   };

//   const handleRemove = () => {
//     selectedItems.forEach((item) => onRemove(item.result.uid));
//     setSelectedItems([]);
//   };

//   return (
//     <div>
//       <ul>
//         {data.map((item, index) => (
//           <li
//             key={index}
//             onClick={() => handleSelect(item)}
//             className={selectedItems.includes(item) ? 'selected' : ''}
//           >
//             <span>
//               Role: {item.result.role} (UID: {item.result.uid})
//             </span>
//             {selectedItems.includes(item) && (
//               <button onClick={() => handleDeselect(item)}>Deselect</button>
//             )}
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleAdd}>Add Selected</button>
//       <button onClick={handleRemove}>Remove Selected</button>
//     </div>
//   );
// }


// StudentTable.jsx
import React from "react";

const StudentTable = ({
  data,
  onDelete,
  onSelectAll,
  onSelectRow,
  selectedRows,
  handleMultipleSelect, // Terima fungsi ini sebagai prop
}) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr className="bg-purple-600 text-white">
            <th className="p-2">
              <input
                type="checkbox"
                onChange={onSelectAll}
                checked={selectedRows.length === data.length}
              />
            </th>
            <th className="p-2">ID</th>
            <th className="p-2">Nama Mahasiswa</th>
            <th className="p-2">NIM Mahasiswa</th>
            <th className="p-2">Alamat</th>
            <th className="p-2">No Telepon</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val) => (
            <tr
              key={val.id}
              className="bg-white hover:bg-purple-100 transition duration-300 ease-in-out"
            >
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(val.id)}
                  onChange={(e) => handleMultipleSelect(e, val.id)} // Panggil fungsi dengan ID yang benar
                />
              </td>
              <td className="p-2">{val.id}</td>
              <td className="p-2">{val.name}</td>
              <td className="p-2">{val.nim}</td>
              <td className="p-2">{val.address}</td>
              <td className="p-2">{val.phone}</td>
              <td className="p-2">
                <button
                  onClick={() => onDelete(val.id)}
                  className="text-red-500 font-semibold hover:text-red-700 p-[2px]"
                >
                  Hapus
                </button>
                <button className="text-green-500 font-semibold hover:text-green-700 p-[2px]">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;

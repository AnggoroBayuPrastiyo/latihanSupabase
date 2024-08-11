import React from "react";

const StudentForm = ({ onSubmit }) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Nama Mahasiswa</label>
        <input
          type="text"
          name="name"
          id="name"
          className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm p-2 transition duration-500 ease-in-out transform hover:scale-105"
          required
        />
      </div>
      <div>
        <label
          htmlFor="nim"
          className="block text-sm font-medium text-gray-700"
        >
          NIM
        </label>
        <input
          type="text"
          name="nim"
          id="nim"
          className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm p-2 transition duration-500 ease-in-out transform hover:scale-105"
          required
        />
      </div>
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Alamat
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm p-2 transition duration-500 ease-in-out transform hover:scale-105"
          required
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          No Telepon
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm p-2 transition duration-500 ease-in-out transform hover:scale-105"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in"
      >
        Submit
      </button>
    </form>
  );
};

export default StudentForm;

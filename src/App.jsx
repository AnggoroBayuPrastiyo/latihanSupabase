import React, { useEffect, useState } from "react";
import useFetchData from "./components/useFetchData";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import supabase from "./connector";
import Chance from "chance";
import "./background-animations.css";
import { generateRandomParticles } from "./particles"; // Import fungsi

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false); // Tambahkan state loading
  const { dataMhs } = useFetchData(refresh);

  let chance = new Chance();

  function generateData() {
    setLoading(true);
    let fakeData = [];

    for (let i = 0; i <= 20; i++) {
      let name = chance.name();
      let nim = chance.integer();
      let address = chance.address();
      let phone = chance.phone();
      fakeData.push({
        name,
        nim,
        address,
        phone,
      });
    }

    supabase
      .from("mahasiswa")
      .insert(fakeData)
      .then((res) => {
        if (res.error) {
          console.error("Error inserting data:", res.error); // Tambahkan log error
        } else {
          console.log("Data successfully inserted:", res.data); // Tambahkan log sukses
        }
        setRefresh(!refresh);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error inserting data:", error); // Tangani error
        setLoading(false);
      });

    console.info("Fake data:", fakeData); // Log data yang akan dimasukkan
  }

  const handleSelectAll = (e) => {
    let checked = e.target.checked;
    if (checked) {
      let allRows = dataMhs.map((val) => val.id);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, nim, address, phone } = event.target.elements;

    const { error } = await supabase.from("mahasiswa").insert([
      {
        name: name.value,
        nim: nim.value,
        address: address.value,
        phone: phone.value,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      alert("Data berhasil disimpan");
      setRefresh(!refresh);
      event.target.reset();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("mahasiswa").delete().eq("id", id);

    if (error) {
      console.error("Error deleting data:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    } else {
      alert("Data berhasil dihapus");
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    const canvas = document.getElementById("backgroundCanvas");
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateRandomParticles(7000); // Panggil fungsi untuk menghasilkan partikel
    }
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center gradient-bg p-4 overflow-hidden">
      <canvas id="backgroundCanvas" className="absolute inset-0 z-0"></canvas>
      <div className="relative w-full max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 z-10">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Form Mahasiswa
        </h1>
        <StudentForm onSubmit={handleSubmit} />
        <button
          className="p-2 bg-purple-700 text-white rounded-md font-bold shadow-md"
          onClick={generateData}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Data"}
        </button>
        <StudentTable
          data={dataMhs}
          onDelete={handleDelete}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          selectedRows={selectedRows}
        />
        {loading && <p>Loading data...</p>}
      </div>
    </div>
  );
};

export default App;

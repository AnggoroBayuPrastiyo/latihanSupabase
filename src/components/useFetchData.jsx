import { useState, useEffect } from "react";
import supabase from "../connector";

const useFetchData = (refresh) => {
  const [dataMhs, setDataMhs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("mahasiswa").select("*");

      if (error) {
        console.error("Error fetching data:", error);
        alert("Terjadi kesalahan saat mengambil data.");
      } else {
        setDataMhs(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [refresh]);

  return { dataMhs, loading };
};

export default useFetchData;

import Navigation from "@/components/Navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UpadateBarang = () => {
  // params
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  // data
  const [namaBarang, setNamaBarang] = useState("");
  const [hargaBarang, setHargaBarang] = useState("");
  const [stokBarang, setStokBarang] = useState("");
  const [namaSupplier, setNamaSupplier] = useState("");
  const [alamatSupplier, setAlamatSupplier] = useState("");
  const [noTelpSupplier, setNoTelpSupplier] = useState("");

  // token
  const token = getCookie("token");

  function goToBarangPage() {
    router.push("/dashboard");
  }

  // handler submit
  function handlerSubmit() {
    axios
      .put(
        `http://159.223.57.121:8090/barang/update/${id}`,
        {
          harga: hargaBarang,
          namaBarang: namaBarang,
          stok: stokBarang,
          supplier: {
            namaSupplier: namaSupplier,
            alamat: alamatSupplier,
            noTelp: noTelpSupplier,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("Data added successfully");
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // fetch data
  useEffect(() => {
    axios
      .get(`http://159.223.57.121:8090/barang/find-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setNamaBarang(res.data.data.namaBarang);
        setHargaBarang(res.data.data.harga);
        setStokBarang(res.data.data.stok);
        setAlamatSupplier(res.data.data.supplier.alamat);
        setNamaSupplier(res.data.data.supplier.namaSupplier);
        setNoTelpSupplier(res.data.data.supplier.noTelp);
      })
      .catch((err) => {
        router.push("/dashboard");
      });
  }, [data, router, token]);

  return (
    <>
      <Head>
        <title>Edit Barang</title>
      </Head>

      <Navigation />

      <main className="flex justify-center">
        <div className="w-[50%] my-10 md:my-[80px]">
          <div>
            <h1 className="font-medium text-[32px] md:text-[48px] text-center">Update Barang</h1>
          </div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaBarang">
                Nama Barang
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="namaBarang"
                type="text"
                placeholder="Nama Barang"
                value={namaBarang}
                onChange={(e) => setNamaBarang(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hargaBarang">
                Harga Barang
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="hargaBarang"
                type="text"
                placeholder="Harga Barang"
                value={hargaBarang}
                onChange={(e) => setHargaBarang(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stokBarang">
                Stok Barang
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stokBarang"
                type="text"
                placeholder="Stok Barang"
                value={stokBarang}
                onChange={(e) => setStokBarang(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaSupplier">
                Nama Supplier
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nama Supplier"
                type="text"
                placeholder="Nama Supplier"
                value={namaSupplier}
                onChange={(e) => setNamaSupplier(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alamatSupplier">
                Alamat Supplier
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamatSupplier"
                type="text"
                placeholder="Alamat Supplier"
                value={alamatSupplier}
                onChange={(e) => setAlamatSupplier(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noTelpSupplier">
                No Telp Supplier
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="noTelpSupplier"
                type="text"
                placeholder="No Telp Supplier"
                value={noTelpSupplier}
                onChange={(e) => setNoTelpSupplier(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-black transition-all ease-in-out" type="button" onClick={goToBarangPage}>
                Kembali
              </button>
              <button className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-black transition-all ease-in-out" type="button" onClick={handlerSubmit}>
                Update Barang
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default UpadateBarang;

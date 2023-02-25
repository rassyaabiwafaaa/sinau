import Navigation from "@/components/Navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TambahBarang = () => {
  const router = useRouter();

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
  function handlerSubmit(e) {
    e.preventDefault();
    axios
      .post(
        `http://159.223.57.121:8090/barang/create`,
        {
          namaBarang: namaBarang,
          harga: hargaBarang,
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

  return (
    <>
      <Head>
        <title>Tambah Barang</title>
      </Head>

      <Navigation />

      <main className="flex justify-center">
        <div className="w-[50%] my-10 md:my-[80px]">
          <div>
            <h1 className="font-medium text-[32px] md:text-[48px] text-center">Tambah Barang</h1>
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
                onChange={(e) => setNoTelpSupplier(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-black transition-all ease-in-out" type="button" onClick={goToBarangPage}>
                Kembali
              </button>
              <button className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-black transition-all ease-in-out" type="button" onClick={handlerSubmit}>
                Tambah Barang
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default TambahBarang;

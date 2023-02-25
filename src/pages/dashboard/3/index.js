import Navigation from "@/components/Navigation";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { Ava } from "public/images";
import Image from "next/image";
import Link from "next/link";

const Dashboard3 = () => {
  const router = useRouter();

  // token
  const token = getCookie("token");
  const username = getCookie("username");

  // data api
  const [data, setData] = useState([]);

  // function go to supplier page
  function goToSupplierPage() {
    router.push("/dashboard/supplier");
  }

  // function go to Tambah Barang Page
  function goToTambahBarangPage() {
    router.push("/dashboard/tambah-barang");
  }

  // function go to handle page

  // function to delete data
  function deleteHandler(e) {
    const id = e.target.value;

    if (window.confirm("Are you sure want to delete?")) {
      axios
        .delete(`http://159.223.57.121:8090/barang/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          alert("Data deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    axios
      .get(`http://159.223.57.121:8090/barang/find-all?limit=10&offset=3`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        router.push("/");
      });
  }, [data, router, token]);

  return (
    <>
      <Head>
        <title>Sinau - Dashboard</title>
      </Head>
      <Navigation />

      <div className="flex justify-center items-start gap-16 flex-wrap">
        <div className="flex flex-col gap-8 mt-5">
          <div className="w-[200px] text-center bg-primary rounded-md shadow-lg">
            <div className="w-[200px] h-[200px] bg-green-400 rounded-t-md">
              <Image src={Ava} className="w-full" alt="Avatar Profile" />
            </div>
            <h1 className="py-3 font-medium text-[18px] text-fontColor">{username}</h1>
          </div>

          <div className="w-[200px] h-full text-center rounded-md shadow-lg">
            <h1 className="py-4 bg-primary font-medium text-[#5dadf8] rounded-t-md">Menu</h1>

            <div>
              <button className="bg-fontColor py-2 w-full">Barang</button>
              <button className=" py-2 w-full rounded-b-md" onClick={goToSupplierPage}>
                Supplier
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
          <div className="flex justify-between items-center mx-5 my-2">
            <h2 className="font-medium">Barang</h2>
            <button className="bg-primary text-fontColor py-2 px-3 rounded-md" onClick={goToTambahBarangPage}>
              Tambah Barang
            </button>
          </div>
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  No
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Nama Barang
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Stock
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Harga
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Nama Supplier
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Alamat Supplier
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  No Telp Supplier
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Aksi
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {data.map((item, index) => {
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">{index + 1}</th>
                    <td className="px-6 py-4">{item.namaBarang}</td>
                    <td className="px-6 py-4">{item.stok}</td>
                    <td className="px-6 py-4">{item.harga}</td>
                    <td className="px-6 py-4">{item?.supplier?.namaSupplier}</td>
                    <td className="px-6 py-4">{item?.supplier?.alamat}</td>
                    <td className="px-6 py-4">{item?.supplier?.noTelp}</td>
                    <td className="px-6 py-4 text-green-600">
                      <Link href={`/dashboard/update-barang/${item.id}`}>Edit</Link>
                    </td>
                    <td className="px-6 py-4 text-red-600">
                      <button value={item.id} onClick={deleteHandler}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-start">
            <div className="px-2 py-2 bg-primary text-black font-bold text-3xl">
              <Link href="/dashboard/2">{"<"}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard3;

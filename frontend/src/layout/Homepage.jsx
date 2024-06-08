// import { Outlet } from "react-router-dom"
import Makanan from "../assets/makanan.png";
import Juice from "../assets/juice.png";
import Snack from "../assets/snack.png";
import Coffee from "../assets/coffee.png";
import axios from "axios";
import { useEffect, useState } from "react";

//ICONS
import { IoAddCircle } from "react-icons/io5";
import { IoRemoveCircleSharp } from "react-icons/io5";

export default function Homepage() {
  const [menu, setMenu] = useState([]);

  const GetMenu = async () => {
    try {
      const response = await axios.get("http://localhost:3223/product");
      setMenu(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const ClickPesanan = () => {
    try {
      alert("Berhasil Menambahkan Pesanan")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetMenu();
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center bg-white p-4">
        <h1 className="font-bold text-xl">E-Menu Beguyur Resto</h1>
      </div>
      <div className="bg-slate-900 p-5">
        <div className="flex items-center gap-8 justify-center">
          <div className="flex flex-col items-center">
            <img className="w-12" src={Makanan} />
            <p className="text-white">Makanan</p>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-12" src={Juice} />
            <p className="text-white">Minuman</p>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-12" src={Snack} />
            <p className="text-white">Snack</p>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-12" src={Coffee} />
            <p className="text-white">Coffee</p>
          </div>
        </div>
      </div>
      <div className="bg-sky-500 p-4">
        {menu.map((index, i) => (
          <div key={i} className="flex p-2  items-center justify-center">
            <div className="container bg-white h-40">
              <div className="flex justify-between items-center px-3 py-2">
                <div className="gambar">
                  <img className=" w-36" src={index.url} alt="gambar" />
                </div>
                <div className=" text-right">
                  <h1>{index.namaproduk}</h1>
                  <p>Rp.{index.hargaproduk}</p>
                  <div className="mt-2 flex">
                    <button onClick={ClickPesanan}>
                      <IoAddCircle size={"2rem"} color="green"/>
                    </button>
                    <button>
                      <IoRemoveCircleSharp size={"2rem"} color="red"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

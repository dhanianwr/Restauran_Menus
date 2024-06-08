import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs-extra";
import multer from "multer";

//Config
const prisma = new PrismaClient();

let gambar = 1
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/product");
    },
    filename: (req, file, cb) => {
      const originalName = file.originalname;
      const fileName = originalName.split('.').slice(0, -1).join('.') + `(${gambar++})${path.extname(originalName)}`;
      fs.exists(`./public/product/${originalName}`, (exists) => {
        if (exists) {
          cb(null, fileName);
        } else {
          cb(null, originalName);
        }
      });
    },
  });

export const uploadFile = multer({ storage: storage });

//Get
export const GetProduct = async (req, res) => {
  try {
    const product = await prisma.menus.findMany();
    if (!product || product.length === 0) {
      res.status(200).json({ msg: "Anda Belum Memiliki Data" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(404).json({ msg: "Tidak Ada Data" });
  }
};

//GetById
export const GetProductById = async (req, res) => {
  try {
    const product = await prisma.menus.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!product) {
      res
        .status(404)
        .json({ msg: `Data Dengan Id: ${req.params.id} Tidak Ditemukan` });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ msg: `Server Error` });
  }
};

//Create
export const CreateProduct = async (req, res) => {
  try {
    const { namaproduk, hargaproduk, deskripsi } = req.body;
    const file = req.file;
    const fileName = file.filename;
    const allowedFormat = [".jpg", ".jpeg", ".png"];
    const url = `${req.protocol}://${req.get(
      "host"
    )}/public/product/${fileName}`;
    const ext = path.extname(file.originalname);

    if (file.size >= 10000000) {
      res.status(422).json({ msg: "Ukuran Gambar Harus Kurang Dari 10 mb" });
    }

    if (!allowedFormat.includes(ext.toLowerCase())) {
      res.status(422).json({ msg: "Format Harus .jpg .jpeg dan .png" });
    }

    await prisma.menus.create({
      data: {
        namaproduk,
        hargaproduk,
        deskripsi,
        gambarproduk: fileName,
        url,
      },
    });
    res.status(201).json({ msg: "Menu Berhasil Ditambahkan" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

//Update
export const UpdateProduct = async (req, res) => {
  const product = await prisma.menus.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  if (!product) {
    res.status(404).json({ msg: "Data Tidak Ditermukan" });
  }
  
    const { namaproduk, hargaproduk, deskripsi } = req.body;
    const file = req.file;
    const fileName = file.filename;
    const allowedFormat = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname);
    const url = `${req.protocol}://${req.get(
      "host"
    )}/public/product/${fileName}`;
 

  if (!allowedFormat.includes(ext.toLowerCase())) {
    res.status(422).json({ msg: "Format Harus .jpg .jpeg dan .png" });
  }

  if (file.size >= 10000000) {
    res.status(422).json({ msg: "Ukuran Gambar Harus Kurang Dari 10 mb" });
  }

  const filepath = `./public/product/${product.gambarproduk}`;
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }

  try {
    await prisma.menus.update({
      data: {
        namaproduk: namaproduk,
        hargaproduk: hargaproduk,
        deskripsi: deskripsi,
        gambarproduk: fileName,
        url: url,
      },

      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({msg:"Menu Berhasil Diperbarui"})
  } catch (error) {
    console.log(error.message)
  }
};

//Delete
export const DeleteProduct = async (req, res) => {
  const product = await prisma.menus.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  if (!product) return res.status(404).json({ msg: "Data Tidak Ada" });

  try {
    const filepath = `./public/dokumen/${product.gambarproduk}`; //gambar dan lokasi direktori gambar
    if (fs.existsSync(filepath)) {
      //perintah untuk unsync gambar (hapus) dari direktori
      fs.unlinkSync(filepath);
    }
    await prisma.menus.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ msg: "Gambar Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
    console.log(error.message);
  }
};

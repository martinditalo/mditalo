import { useState, useEffect, ReactElement } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/setup";
import SaleTable from "../components/SaleTable";
import { Stack, Typography } from "@mui/material";
import { Sales } from "./types";
import TransitionsModal from "../components/AddModal";

const Sale = (): ReactElement => {
  const [sales, setSales] = useState<Sales[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [stockAmount, setStockAmount] = useState(0);

  const fetchSales = async () => {
    const salesCollection = collection(db, "sales");
    const salesSnapshot = await getDocs(salesCollection);
    const salesData: any = salesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSales(salesData);
    console.log(salesData);
  };

  const handleAddSale = async () => {
    if (name !== "") {
      const salesCollection = collection(db, "sales");
      await addDoc(salesCollection, {
        name: name,
        category: category,
        price: price,
        size: size,
        stockAmount: stockAmount,
      });
      setName("");
      setCategory("");
      setPrice(0);
      setSize("");
      setStockAmount(0);
      fetchSales(); // Update sales data after adding new sale
    }
  };

  const handleUpdateSale = async (id: string, name: string) => {
    const saleRef = doc(db, "sales", id);
    await updateDoc(saleRef, { name: name });
    fetchSales(); // Update sales data after updating sale
  };

  const handleDeleteSale = async (id: string) => {
    const saleRef = doc(db, "sales", id);
    await deleteDoc(saleRef);
    fetchSales(); // Update sales data after deleting sale
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <Stack p={5}>
      <Typography textAlign={"center"} variant="h4">
        Restaurant Sales Tracker
      </Typography>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
        />
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Size"
        />
        <input
          type="number"
          value={stockAmount}
          onChange={(e) => setStockAmount(Number(e.target.value))}
          placeholder="Stock"
        />
        <button onClick={handleAddSale}>Add Sale</button>
      </div>
      <TransitionsModal />

      <SaleTable data={sales} deleteSale={handleDeleteSale} />
    </Stack>
  );
};

export default Sale;

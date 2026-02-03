import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    await addDoc(collection(db, "products"), {
      title,
      price,
      description,
    });

    alert("Product added");
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddProduct;

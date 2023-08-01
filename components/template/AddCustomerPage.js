import { useRouter } from "next/router";
import { useState } from "react";
import Form from "../module/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveNotify, wrongSaveNotify, errorSaveNotify } from "@/utils/notifs";

function AddCustomerPage() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    date: "",
    products: [],
  });

  const router = useRouter();

  const saveHandler = async () => {
    const res = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify({ data: form }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      saveNotify();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else if (data.message === "Invalid data") {
      wrongSaveNotify();
    } else {
      errorSaveNotify();
    }
  };

  const cancelHandler = () => {
    setForm({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      date: "",
      products: [],
    });
    router.push("/");
  };

  return (
    <div className="customer-page">
      <h4>Add New Customer</h4>
      <Form form={form} setForm={setForm} />
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>
          Cancel
        </button>
        <button className="second" onClick={saveHandler}>
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddCustomerPage;

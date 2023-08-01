import { useState } from "react";
import Form from "../module/Form";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editNotify, errorEditNotify } from "@/utils/notifs";

function CustomerEditPage({ data, id }) {
  const date = data.date ? moment(data.date).utc().format("YYYY-MM-DD") : "";

  const [form, setForm] = useState({
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || "",
    address: data.address || "",
    postalCode: data.postalCode || "",
    products: data.products || "",
    date: date || "",
  });

  const router = useRouter();

  const saveHandler = async () => {
    const res = await fetch(`/api/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ data: form }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      editNotify();
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      errorEditNotify();
    }
  };

  const cancelHandler = () => {
    router.push("/");
  };

  return (
    <div className="customer-page">
      <h4>Edit Customer</h4>
      <Form form={form} setForm={setForm} />
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>
          Cancel
        </button>
        <button className="second" onClick={saveHandler}>
          Edit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CustomerEditPage;

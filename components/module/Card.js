import Link from "next/link";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

function Card({ customer }) {
  const router = useRouter();

  const deleteHandler = async () => {
    const res = await fetch(`/api/delete/${customer._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.success("Data deleted successfully!", {
        duration: 1500,
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
        iconTheme: {
          secondary: "#000",
        },
      });
      setTimeout(() => {
        router.reload();
      }, 1500);
    } else {
      toast.error("Data isn't deleted successfully!", {
        duration: 1500,
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
        iconTheme: {
          secondary: "#000",
        },
      });
    }
  };

  return (
    <div className="card">
      <div className="card__details">
        <p>
          {customer.name} {customer.lastName}
        </p>
        <p>{customer.email}</p>
      </div>
      <div className="card__buttons">
        <button onClick={deleteHandler}>Delete</button>
        <Link href={`/edit/${customer._id}`}>Edit</Link>
        <Link href={`/customer/${customer._id}`}>Details</Link>
      </div>
      <Toaster />
    </div>
  );
}

export default Card;

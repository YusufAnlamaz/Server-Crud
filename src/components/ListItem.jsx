import { IoIosBriefcase } from "react-icons/io";
import { RiVipCrownFill } from "react-icons/ri";
import { FaCalendarDays } from "react-icons/fa6";
import api from "../utiles/api";
import { useState } from "react";
import Modal from "./modal";
import { toast } from "react-toastify";

const ListItem = ({ todo, setTodos }) => {
  const [isOpen, setIsOpen] = useState(false);

  const icon =
    todo.status === "important" ? (
      <IoIosBriefcase className="text-danger fs-4" />
    ) : todo.status === "job" ? (
      <RiVipCrownFill className="text-primary fs-4" />
    ) : (
      <FaCalendarDays className="text-success fs-4" />
    );

  const handleDelete = () => {
    //Fetch ile yapılırsa
    // fetch(`http://localhost:4010/todos/${todo.id}`, { method: "delete" });

    //Axios ile yapılırsa
    api.delete(`/todos/${todo.id}`).then(() => {
      setTodos((todos) => todos.filter((item) => item.id !== todo.id));

      toast.info("Todo Kaldırıldı");
    });
  };

  return (
    <li className="p-3 list-group-item d-flex justify-content-between align-items-center gap-3">
      {icon}
      <span>{todo.title}</span>

      <div className="btn-group">
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-sm btn-primary"
        >
          Düzenle
        </button>
        <button onClick={handleDelete} className="btn btn-sm btn-danger">
          Sil
        </button>
      </div>
      {isOpen && (
        <Modal todo={todo} setTodos={setTodos} close={() => setIsOpen(false)} />
      )}
    </li>
  );
};
export default ListItem;

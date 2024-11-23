import api from "../utiles/api";
import { toast } from "react-toastify";

const Form = ({ setTodos }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target[0].value;
    const status = e.target[1].value;

    if (!text.trim()) {
      return alert("Lütfen içeriği belirleyin");
    }

    const newTodo = {
      title: text,
      status,
      date: new Date().toLocaleString("en-us"),
    };
    //Fetch ile istek atılırsa
    // fetch("http://localhost:4010/todos", {
    //   method: "POST",
    //   body: JSON.stringify(newTodo),
    // });
    //Axios ile yapıldığında
    api
      .post("/todos", newTodo)
      .then((res) => {
        setTodos((todos) => [res.data, ...todos]);
        toast.success("Todo Oluşturuldu");
      })
      .catch((err) => toast.error("Bir sorun oluştu"));

    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input
        placeholder="örn: react porjesi yap"
        className="form-control shadow"
      />
      <select className="form-select w-50 shadow">
        <option value="daily">Günlük</option>
        <option value="job">İş</option>
        <option value="important">Önemli</option>
      </select>
      <button className="btn btn-primary shadow">Gönder</button>
    </form>
  );
};
export default Form;

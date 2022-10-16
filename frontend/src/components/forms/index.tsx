import axios from "axios";
import { BASE_URL } from "../../utils/request";
import { useForm } from "react-hook-form";
import { useState } from "react";
import './style.css';

function insertSaleForm() {
  const { register, handleSubmit } = useForm();
  const [showModal, setShowModal] = useState(false);


  const onSubmit = (data) => {

    var day = data.date.split("/")[0];
    var month = data.date.split("/")[1];
    var year = data.date.split("/")[2];

    var objData = {
      "amount": data.amount,
      "date": year + "-" + month + "-" + day,
      "deals": data.deals,
      "sellerName": data.sellerName,
      "visited": data.visited
    };

    axios.post(`${BASE_URL}/sales`, objData);
    window.location.reload();
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dsmeta-form-sales">
      <div className="content">
        <label className="line-content">
          <div className="item">
            Total Vendido:
            <input {...register("amount", { required: true })} className="input"/>
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            Data:
            <input {...register("date", { required: true })} className="input"/>
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            Vendas:
            <input {...register("deals", { required: true })} className="input"/>
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            Vendedor:
            <input {...register("sellerName", { required: true })} className="input"/>
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            Visitas:
            <input {...register("visited", { required: true })} className="input"/>
          </div>
        </label>
        <input type="submit" value="Enviar" className="submit"/>
      </div>
    </form>
  )

}

export default insertSaleForm;
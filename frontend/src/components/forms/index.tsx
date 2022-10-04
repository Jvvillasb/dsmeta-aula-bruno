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
            Amount:
            <input {...register("amount", { required: true })} className="input"/>
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            Date:
            <input {...register("date", { required: true })} className="input"/>
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            Deals:
            <input {...register("deals", { required: true })} className="input"/>
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            seller:
            <input {...register("sellerName", { required: true })} className="input"/>
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            Visited:
            <input {...register("visited", { required: true })} className="input"/>
          </div>
        </label>
        <input type="submit" value="submit" className="submit"/>
      </div>
    </form>
  )

}

export default insertSaleForm;
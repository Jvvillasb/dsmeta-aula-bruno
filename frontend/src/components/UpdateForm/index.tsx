import { useForm } from "react-hook-form";
import './styles.css';
import axios from "axios";
import { BASE_URL } from "../../utils/request";
import { useState, useEffect, PropsWithoutRef } from "react";
import { Sale } from "../../models/sale";
import SalesCard from "../SalesCard";

type Props = {
  sale: {};
  saleId: number;
}

function UpdateForm(sale: Props, saleId: Props) {
  const { register, handleSubmit } = useForm();
  const { visited, deals, amount, date, sellerName } = sale.sale.sale;
  var id = sale.sale.saleId;
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {

    var objData = {
      "id": id,
      "amount": data.amount,
      "date": data.date,
      "deals": data.deals,
      "sellerName": data.sellerName,
      "visited": data.visited
    };

    axios.put(`${BASE_URL}/sales/${id}`, objData).then(() => {
      setShowModal(true);
      if (showModal) {
        setShowModal(false);
      };
      window.location.reload();
    });
    
  };

  return (!showModal && (
    <form className="dsmeta-form-update" onSubmit={handleSubmit(onSubmit)}>
      <div className="content">
        <label className="line-content">
          <div className="item">
            Amount:
            <input {...register("amount", { required: true, value: amount })} className="input" />
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            Date:
            <input {...register("date", { required: true, value: date })} className="input" />
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            Deals:
            <input {...register("deals", { required: true, value: deals })} className="input" placeholder={deals} />
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            seller:
            <input {...register("sellerName", { required: true, value: sellerName })} className="input" placeholder={sellerName} />
          </div>
        </label>
        <label className="line-content">
          <div className="item">
            Visited:
            <input {...register("visited", { required: true, value: visited })} className="input" placeholder={visited} />
          </div>
        </label>
        <input type="submit" value="submit" className="submit" />
      </div>
    </form>
  ))
}

export default UpdateForm
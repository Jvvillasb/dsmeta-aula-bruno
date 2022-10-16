import InsertSaleForm from "../forms";
import { useState } from "react";
import './style.css';

function crudButton () {
  const [showModal, setShowModal] = useState(false);
  
  const handleClicked = () => {
    setShowModal(true);
    if (showModal) {
      setShowModal(false);
    };

  }

  return (
    <div className="dsmeta-group">
      <button className="dsmeta-button" onClick={handleClicked}>Novo Vendedor</button>
      {showModal && <InsertSaleForm/> }
    </div>
  )
}

export default crudButton;
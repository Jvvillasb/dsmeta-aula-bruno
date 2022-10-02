import UpdateForm from '../UpdateForm';
import { useState } from "react";

type Props = {
  sale: {};
  saleId: number;
}


function UpdateButton(sale: Props, saleId: number) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
    if (showModal) {
      setShowModal(false);
    };
  }

  return (
    <div>
      <div className="dsmeta-btn dsmeta-red" onClick={() => handleClick()}> </div>
      {showModal && <UpdateForm sale={sale} saleId={saleId}/>}
    </div>
  )
}


export default UpdateButton

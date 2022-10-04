import UpdateForm from '../UpdateForm';
import { useState } from "react";
import icon from '../../assets/img/notification-icon.svg';
import './styles.css';

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
      <div className="dsmeta-btn dsmeta-green" onClick={() => handleClick()}><img src={icon} alt="Notificar" />
      </div>
      {showModal && <UpdateForm sale={sale} saleId={saleId} />}
    </div>
  )
}


export default UpdateButton

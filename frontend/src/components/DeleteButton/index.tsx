import axios from 'axios';
import icon from '../../assets/img/notification-icon.svg';
import { BASE_URL } from '../../utils/request';
import './styles.css';
import { useState } from 'react';

type Props = {
  saleId: number;
}

function handleClick(id: number) {
  let confirm = window.confirm("Deseja realmente excluir a venda?");

  if (confirm) {
    axios.delete(`${BASE_URL}/sales/${id}`)
      .then(response => {
        window.location.reload();
      });
  }
}

function DeleteButton({ saleId }: Props) {
  return (
    <div className="dsmeta-btn dsmeta-red" onClick={() => handleClick(saleId)}>
      <img src={icon} alt="Notificar" />
    </div>
  )
}

export default DeleteButton;

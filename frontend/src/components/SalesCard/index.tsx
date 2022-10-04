import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Sale } from "../../models/sale";
import { BASE_URL } from "../../utils/request";
import NotificationButton from '../NotificationButton';
import './styles.css';
import InsertSaleForm from "../forms";
import CrudButton from "../crudButton";
import DeleteButton from "../DeleteButton";
import UpdateButton from "../UpdateButton";

function SalesCard() {

    const min = new Date(new Date().setDate(new Date().getDate() - 365));
    const max = new Date();

    var string ='';
    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);
    const [orderBy, setOrderBy] = useState('id');
    const [order, setOrder] = useState(true);

    const [sales, setSales] = useState<Sale[]>([]);

    if(order) {
        string = 'asc';
    }
    else {
        string = 'desc';
    }

    useEffect(() => {

        const dmin = minDate.toISOString().slice(0, 10);
        const dmax = maxDate.toISOString().slice(0, 10);

        axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}&page=0&size=10&sort=id,desc`)
            .then(response => {
                setSales(response.data.content);
            });

    }, [minDate, maxDate]);
    
    const handleClick = () => {
        if(order) {
            setOrder(false);
        }
        else {
            setOrder(true);
        }

        axios.get(`${BASE_URL}/sales?page=0&size=10&sort=${orderBy},${string}`)
        .then(response => {
            setSales(response.data.content);
        });
    }

    return (
        <div className="dsmeta-card">
            <CrudButton />
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => setMinDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                        disabledKeyboardNavigation
                        withPortal
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => setMaxDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                        withPortal
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992"><a onClick={() => {setOrderBy('id'); handleClick()}} className="dsmeta-name-table">ID</a></th>
                            <th className="show576"><a onClick={() => {setOrderBy('date'); handleClick()}} className="dsmeta-name-table">Data</a></th>
                            <th><a onClick={() => {setOrderBy('sellerName'); handleClick()}} className="dsmeta-name-table">Vendedor</a></th>
                            <th className="show992"><a className="dsmeta-name-table" onClick={() => {setOrderBy('visited'); handleClick()}}>Visitas</a></th>
                            <th className="show992"><a className="dsmeta-name-table" onClick={() => {setOrderBy('deals'); handleClick()}}>Vendas</a></th>
                            <th ><a onClick={() => {setOrderBy('amount'); handleClick()}} className="dsmeta-name-table">Total</a></th>
                            <th>Notificar</th>
                            <th>Atualizar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td className="show992">{sale.id}</td>
                                    <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                                    <td>{sale.sellerName}</td>
                                    <td className="show992">{sale.visited}</td>
                                    <td className="show992">{sale.deals}</td>
                                    <td>R$ {sale.amount.toFixed(2)}</td>
                                    <td>
                                        <div className="dsmeta-red-btn-container">
                                            <NotificationButton saleId={sale.id} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="dsmeta-red-btn-container">
                                            <UpdateButton sale={sale} saleId={sale.id} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="dsmeta-red-btn-container">
                                            <DeleteButton saleId={sale.id} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default SalesCard;
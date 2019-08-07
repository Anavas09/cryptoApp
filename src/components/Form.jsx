import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

function Form({setMoneda, setCriptomoneda}){

    const [criptomonedas, setCriptomonedas] = useState([]);
    const [monedaCotizar, setMonedaCotizar] = useState('');
    const [criptoCotizar, setCriptoCotizar] = useState('');
    const [error, setError] = useState(false);


    useEffect(()=>{
        const fetchAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=VES'
            await axios.get(url)
                    .then(res => {
                        const { Data } = res.data;
                        setCriptomonedas(Data)
                    })
        }

        fetchAPI()
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault()

        //Validar si ambos campos están llenos
        if(monedaCotizar === '' || criptoCotizar === ''){
            setError(true);
            return;
        }
        //Pasar valores al componente principal
        setError(false);
        setMoneda(monedaCotizar);
        setCriptomoneda(criptoCotizar);
    }

    //Mostrar un error si existe
    const mensajeError = error ? <Error mensaje="Ambos campos son obligatorios"/> : null;


    return (
        <form onSubmit={handleOnSubmit}>
            {mensajeError}
            <div className="row">
                <label>Elige tu moneda</label>
                <select
                    className="u-full-width"
                    onChange={(e)=> setMonedaCotizar(e.target.value)}
                >
                    <option value="">-Elige una moneda-</option>
                    <option value="VES">Bolívar Soberano</option>
                    <option value="USD">Dólar Estadounidense</option>
                    <option value="ARS">Peso Argentino</option>
                    <option value="COP">Peso Colombiano</option>
                    <option value="EUR">Euro</option>
                    <option value="GBP">Libras</option>
                </select>
            </div>

            <div className="row">
                <select
                    className="u-full-width"
                    onChange={(e)=> setCriptoCotizar(e.target.value)}
                >
                    <option value="">-Elige una Criptomoneda-</option>
                    {criptomonedas.map(criptomoneda => {
                        const { CoinInfo } = criptomoneda;
                        const { Id } = CoinInfo;
                        return(
                            <Criptomoneda key={Id} criptomoneda={criptomoneda}/>
                        )
                    })}
                </select>
            </div>

            <input type="submit" className="button-primary u-full-width" value="Calcular"/>
        </form>
    );
};

Form.propTypes = {
    setMoneda: PropTypes.func.isRequired,
    setCriptomoneda: PropTypes.func.isRequired,
};

export default Form;
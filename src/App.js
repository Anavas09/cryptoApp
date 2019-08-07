import React, { useEffect, useState } from 'react';
import imagen from './cryptomonedas.png'
import Form from './components/Form';
import axios from 'axios';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';

function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [result, setResult] = useState({})

  useEffect(()=> {
    const cotizarCriptomoneda = async () => {

      //Si no hay moneda, no se ejecuta
      if(moneda === ''){
        return;
      }

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

      //Mostrar spinner
      setCargando(true);

      //Hacer la cnsulta a la base de datos
      await axios.get(url)
        .then(res => {
          //Despues de 4seg, ocultar el spinner y guardar resultado de la consulta
          setTimeout(() => {
            setCargando(false)
            setResult(res.data.DISPLAY[criptomoneda][moneda])
          }, 3000);
        })
    }

    cotizarCriptomoneda()
  }, [moneda, criptomoneda])

  //Mostar spinner o resultado
  const spinResult = (cargando) ? <Spinner /> : <Cotizacion resultado={result}/>;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="crypto img" className="logo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza Criptomonedas al Instante</h1>

          <Form
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
          />
          {spinResult}
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';

const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0){
        return null;
    }

    const { CHANGEPCT24HOUR, HIGHDAY, LASTUPDATE, LOWDAY, PRICE } = resultado

    return (
        <div className="resultado">
            <h2>Resultado</h2>
            <p className="precio">El precio es: <span>{PRICE}</span></p>
            <p>Precio más alto del día: <span>{HIGHDAY}</span></p>
            <p>Precio más bajo del día: <span>{LOWDAY}</span></p>
            <p>Variación de las ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span>%</p>
            <p>Ultima actualización: <span>{LASTUPDATE}</span></p>
        </div>
    );
};

Cotizacion.propTypes = {
    resultado: PropTypes.object.isRequired,
};

export default Cotizacion;
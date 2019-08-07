import React from 'react';
import PropTypes from 'prop-types';

function Criptomoneda({criptomoneda}){
    const { CoinInfo } = criptomoneda;
    const { FullName, Name } = CoinInfo;

    return (
        <option value={Name}>{FullName}</option>
    );
};

Criptomoneda.propTypes = {
    criptomoneda: PropTypes.object.isRequired,
};

export default Criptomoneda;
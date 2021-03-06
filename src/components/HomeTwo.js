import React from 'react';
import { connect } from 'react-redux';
import { transformTokenAction } from '../redux/userDuck'
import { Link } from 'react-router-dom'

const HomeTwo = ({ token, displayName, transformTokenAction }) => {

    const onClick = () => {
        transformTokenAction("lo que sea")
    }

    return ( 
        <div>
            <Link to="/chars" >Chars</Link>
            <h2>Home with redux, welcome {displayName}</h2>
            <h3>{token}</h3>
            <button onClick={onClick}>
                Transform Token
            </button>
        </div>
     );
}

function mapStateToProps({user:{displayName, token}}) {
    return {
        displayName,
        token
    }
}

// agregar un input para que escribamos el nuevo token y usar el valor para reescribir el token
 
export default connect(mapStateToProps, {transformTokenAction})(HomeTwo);
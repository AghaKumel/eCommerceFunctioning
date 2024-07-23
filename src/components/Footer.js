import React from 'react'
import './Footer.css';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <div className='footer'>
                <div className='ele1'>
                    <Link>Terms and Conditions</Link>
                </div>
                <div className='ele2'>
                    <Link>Copyrights</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer

/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import './styles.css';


type Props = {
    link: string;
    linkText: string;
}

const ButtonLogin = ({ link, linkText }: Props) => {
    return (
        <Link to={link}>
            <div className="home-actions">
                <button className="home-btn">
                    {linkText}
                </button>
                <div className="home-btn-icon">
                    <ArrowIcon />
                </div>
            </div>
        </Link>
    );
}

export default ButtonLogin;

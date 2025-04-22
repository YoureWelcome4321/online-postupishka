import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Header() {
  return (
    <div className="py-4">
      <ul className="flex text-lg mx-5 items-center">
        <li>
          <Link to="/">
            <img src="./dolphin.png" className="w-12"></img>
          </Link>
        </li>
        <div className='flex items-center ml-6'>
          <li className="mx-4">
            <Link>Тренажёры</Link>
          </li>
          <li className="mx-4">
            <Link>Психолог</Link>
          </li>
          <li className="mx-4">Помощь с расписанием</li>
          <li className="mx-4">Помощь с выбором специальности</li>
        </div>
        <div className="ml-auto">
          <button className="cursor-pointer px-12 py-6 c-">Личный кабинет</button>
        </div>
      </ul>
    </div>
  );
}

export default Header;

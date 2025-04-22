// pages/SpecialtyPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const UserPage = () => {
  return (
    <div className="">
      <Header/>
      <h1 className="text-4xl font-bold mb-6">Подбор специальности</h1>
      <div className="bg-[#1a1a1a] p-6 rounded-2xl">
        <h3 className="text-xl mb-4">Рекомендации</h3>
        <p className="text-gray-400">На основе ваших интересов и способностей</p>
      </div>
      <Link to="/" className="text-[#6E7BF2] mt-8 inline-block">
        ← Вернуться на главную
      </Link>
    </div>
  );
};

export default UserPage;
import React, { useEffect, useState } from 'react'
import styles from "./styles/CRUDBoards.module.css";

const CRUDBoards = () => {
  const [boards, setBoards] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    nombreCientifico: "",
    descripcion: "",
    precio: "",
    filtro: "",
    foto: ""
  })

};

export default CRUDBoards;

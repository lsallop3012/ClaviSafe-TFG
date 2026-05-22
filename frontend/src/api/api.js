import { useEffect, useState } from "react";

const useLoadUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/users");

                if (!response.ok) {
                    throw new Error("Error HTTP: " + response.status);
                }

                const data = await response.json();
                setUsers(data);

            } catch (error) {
                console.error("Error al cargar los usuarios:", error);
            }
        };

        loadUsers();
    }, []);

    return users;
};

export default useLoadUsers;
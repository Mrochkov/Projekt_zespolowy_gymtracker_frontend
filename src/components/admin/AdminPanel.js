import React, {useEffect, useState} from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import "./admin.css";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import api from "../../api/axiosConfig";

const AdminPanel = () => {

    const [user, setUser] = useState();
    const [trainers, setTrainers] = useState(null);


    useEffect(() => {
        const getUsers = async () => {
            try {
                const userResponse = await api.get(`/user`);
                setUser(userResponse.data);
                console.log(userResponse.data);


            } catch(err) {
                console.log(err);
            }
        };
        getUsers();
    }, []);

        const getTrainers = async () => {
            try {
                const response = await api.get("/trainer/all")
                console.log(response.data);
                setTrainers(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        useEffect(() => {
            getTrainers();
        }, []);

    const handleBan = (userId) => {
        console.log("Ban user with ID:", userId);
    };

    const handleChangeRole = (userId) => {
        console.log("Change role for user with ID:", userId);
    };
        /*
            const handleBan = (user.id) => {
                console.log("Ban user with ID:", user.id);
            };

            const handleChangeRole = (user.id) => {
                console.log("Change role for user with ID:", user.id);
            };


         */
        return (
            <div>
                <Navbar/>
                <div className="admin-background">
                    <h1 className="mb-5">Admin panel</h1>
                    <Container>
                        <h2 className="text-white mb-4">Users</h2>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Login</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {user && user.map((user, id) => (
                                <tr key={id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.login}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleBan(user.id)}>Ban</Button>{' '}
                                        <Button variant="secondary" onClick={() => handleChangeRole(user.id)}>Change Role</Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                        <h2 className="text-white mb-4 mt-5">Trainers</h2>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Login</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {trainers && trainers.map((trainer, id) => (
                                <tr key={id}>
                                    <td>{trainer.id}</td>
                                    <td>{trainer.name}</td>
                                    <td>{trainer.login}</td>
                                    <td>{trainer.email}</td>

                                    <td>
                                        <Button variant="danger " onClick={() => handleBan(trainer.id)}>Ban</Button>
                                        <Button variant="secondary ml-2" onClick={() => handleChangeRole(trainer.id)}>Change Role</Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>
                <Footer/>
            </div>
        );
};

export default AdminPanel;

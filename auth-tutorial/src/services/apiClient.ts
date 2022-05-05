import axios from "axios";

export enum Routes {
    Users = "/users"
}

export const ApiClient = axios.create({
    baseURL: "http://localhost:3500"
});

import { apiClient } from "./ApiClient";

const retrieveHelloWorldBean =  () => apiClient.get("/hello-world-bean");

// Response to preflight request doesn't pass access control check -> When Authroization header is provided. Change has been made to the backend to allow HttpMethod.OPTIONS for preflight requests
const retrieveHelloWorldPathVariable = (name) => apiClient.get(`/hello-world/path-variable/${name}`);


// We have included token here in the request as it is the first request that is fired at the time of login to validate the token and set it up for the future requests.
const executeBasicAuthenticationService = (token) => apiClient.get(`/basicAuth`, {headers : {
    Authorization: token
}});


export {retrieveHelloWorldBean, retrieveHelloWorldPathVariable, executeBasicAuthenticationService}
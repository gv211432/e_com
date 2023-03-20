import axios from "axios";

// creating an instance with base url and allwing response cookies
const axiosInstance = axios.create({
  baseURL: `${window.location.protocol === 'https:'
    ? `//${window.location.hostname}`
    : `//${window.location.hostname}:5000`}`,
  credentials: "include",
  withCredentials: true,
});

// // creating an instance with base url and allwing response cookies
// const axiosInstance = {
//   post: async (url, payload) => {
//     // let xhr = new XMLHttpRequest();
//     // xhr.open("POST", `${window.location.protocol === 'https:'
//     //   ? `//${window.location.hostname}/${url}`
//     //   : `//${window.location.hostname}:5000`}/${url}`,);
//     // xhr.send();

//     // return xhr.onload = () => {
//     //   if (xhr.status == 200) {
//     //     return xhr.responseText;
//     //   }
//     // };

//     // 1. Create a new XMLHttpRequest object;
//     let xhr = new XMLHttpRequest();

//     // 2. Configure it: GET-request for the URL /article/.../load
//     xhr.open('POST', `${window.location.protocol === 'https:'
//       ? `//${window.location.hostname}/${url}`
//       : `//${window.location.hostname}:5000`}${url}`, true);

//     // 3. Send the request over the network
//     xhr.send(payload);

//     // 4. This will be called after the response is received
//     xhr.onload = function () {
//       if (xhr.status != 200) { // analyze HTTP status of the response
//         alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
//       } else { // show the result
//         alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
//       }
//     };

//   }
// };

export default axiosInstance;
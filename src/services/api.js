import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
// import { logout } from "../context/user";


  // export function setupApiClient() {

  //   const [cookies, setCookie] = useCookies([""]);


  //   // const { token, refreshToken } = getCookies()
  //   console.log("token api: ", cookies.token)
  //   const api = axios.create({
  //     baseURL: 'https://pi-t2-g3.herokuapp.com',
  //     headers: {
  //       Authorization: `Bearer ${cookies.token}`
  //     }
  //   });

  //   api.interceptors.response.use(response => {
  //     return response
  //   }, (error) => {
  //     if (error.response?.status === 403) {
  //       if (error.response?.data.message === 'Refresh token expirado.') {

  //         const refreshToken = cookies.refresh_token;
  //         const originalConfig = error.config;

  //         if (!tokenEstaAtualizado) {
  //           tokenEstaAtualizado = true;
  //           let config = {
  //             headers: {
  //               'Authorization': `Bearer ${refreshToken}`,
  //             }
  //           }
  //           api.get('/permitAll/refresh-token', config)
  //             .then(response => {
  //               const { token, refresh_token, permissoes } = response.data;
  //               // setCookie("token", token, { path: "/" });
  //               // setCookie("refresh_token", refresh_token, { path: "/" });
  //               // setCookie("permissoes", permissoes, { path: "/" });

  //               api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  //               filaSolicitacoesComFalhas.forEach(request => request.onSuccess(token));
  //               filaSolicitacoesComFalhas = [];
  //             }).catch(error => {
  //               filaSolicitacoesComFalhas.forEach(request => request.onFailure(error));
  //               filaSolicitacoesComFalhas = [];

  //               // if (process.browser) {
  //               //   logout();
  //               // }
  //             }).finally(() => { tokenEstaAtualizado = false });
  //         }
  //         return new Promise((resolve, reject) => {
  //           filaSolicitacoesComFalhas.push({
  //             onSuccess: (token) => {
  //               if (!originalConfig?.headers) {
  //                 return;
  //               }
  //               originalConfig.headers['Authorization'] = `Bearer ${token}`;
  //               resolve(api(originalConfig));
  //             },
  //             onFailure: (error) => {
  //               reject(error);
  //             }
  //           })
  //         })
  //       } else {
  //         // if (process.browser) {
  //         //   logout();
  //         // } else {
  //         return Promise.reject(new Error("Erro em token de autenticação"))
  //         // }
  //       }
  //     }
  //     return Promise.reject(error);
  //   });

  //   return api;
  // }

const api = axios.create({
  baseURL: 'https://api-digital-booking.herokuapp.com/',
});

export default api;

const axios = require("axios")

const generateAxios = (token) => {
    const axiosInstance = axios.create({
      baseURL: 'https://sandbox.actividades.techo.org/api'
    })
    // Config de headers de axios para pedidos con autenticación
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
    return axiosInstance
  }

module.exports = generateAxios;
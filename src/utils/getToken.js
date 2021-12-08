const getToken = () => {
    const ls = JSON.parse(localStorage.getItem("persist:root"))
    const usuario = JSON.parse(ls.usuario)
    const token = usuario.token
    return token
}

export default getToken
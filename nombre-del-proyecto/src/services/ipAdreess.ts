export async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log(data.ip);
        return data.ip;
    } catch (error) {
        console.error('Error al obtener la dirección IP:', error);
        return null;
    }
}

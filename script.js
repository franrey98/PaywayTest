
const publicApiKey = "e9cdb99fff374b5f91da4480c8dca741";
const urlSandbox = "https://developers.decidir.com/api/v2";
const inhabilitarCS = true;
// Instancia de Decidir para el ambiente Sandbox
const decidir = new Decidir(urlSandbox,inhabilitarCS);
decidir.setPublishableKey(publicApiKey);
decidir.setTimeout(5000); // Timeout de 5 segundos

// Selección del formulario
const form = document.querySelector('#formulario');

// Asigna la función de invocación al evento submit
form.addEventListener('submit', sendForm);

// Función para manejar la respuesta
function sdkResponseHandler(status, response) {
    if (status !== 200 && status !== 201) {
        console.error("Error al generar token:", response);
        alert("Error al generar el token. Verifique los datos.");
    } else {
        console.log("Token generado exitosamente:", response);
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(response); // Enviar token al WebView
        }
    }
}

// Función de invocación con el SDK
function sendForm(event) {
    event.preventDefault();
    decidir.createToken(form, sdkResponseHandler);
    return false;
}
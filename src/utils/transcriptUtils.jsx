
export const manageTranscript = (orden, transcript) => {
    const eliminar = "eliminar";
    const lastOrdenIndex = transcript.lastIndexOf(orden);
    console.log(lastOrdenIndex);
    const lastErrorIndex = transcript.lastIndexOf(eliminar);  
    console.log(lastErrorIndex);
    if (lastOrdenIndex > (lastErrorIndex)) {
        return transcript.slice(lastOrdenIndex + orden.length).trim();
    }else {
        return transcript.slice(lastOrdenIndex + orden.length + lastErrorIndex + 2).trim();
    }
}

// console.log(manageTranscript("Buscar", "Buscar cliente 1234 eliminar"));
// console.log(manageTranscript("Buscar", "Buscar cliente 1234 eliminar 123"));
// console.log(manageTranscript("Buscar", "Buscar cliente 1234 eliminar 123 buscar 123"));
// console.log(manageTranscript("Buscar", "Buscar cliente 1234 eliminar 123 buscar 123 eliminar"));

// console.log(manageTranscript("número", "número de cliente 1234 eliminar 123 1111111 eliminar 903898412"));
// // {console.log(manageTranscript("número", "número de cliente 1234 eliminar 123"));
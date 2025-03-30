
export const manageTranscript = (orden, transcript) => {
    const eliminar = "eliminar";
    const lastOrdenIndex = transcript.lastIndexOf(orden);
    const lastDeleteIndex = transcript.lastIndexOf(eliminar);  
    if (lastOrdenIndex > (lastDeleteIndex)) {
        return transcript.slice(lastOrdenIndex + orden.length).trim();
    }else {
        return transcript.slice(lastOrdenIndex + orden.length + lastDeleteIndex + 2).trim();
    }
}
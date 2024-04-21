export const constructEnglishMessage = (selectedButton: string, prompInfo: string) => {
    if (selectedButton === 'Reflection') {
      return `Please analyze the following programming problem: ${prompInfo}. After analyzing the error, kindly propose a solution. Additionally, provide feedback on the correctness of your answer and elucidate any discrepancies if present. Please answer in English`;
    } else {
      return `As per discussions on various reputable forums such as Stack Overflow, GitHub Issues, LinkedIn, and other programming-related platforms, you are requested to address the following error(s) provided below: Error(s) Encountered:${prompInfo}. Your response should be thorough and well-informed, drawing insights from these platforms and any other relevant programming resources. Additionally, please specify the tools and methodologies you employ in your analysis and resolution. Please answer in Spanish`;
    }
  };
  
  export const constructSpanishMessage = (selectedButton: string, prompInfo: string) => {
    if (selectedButton === 'Reflection') {
      return `Por favor, analiza el siguiente problema de programación: ${prompInfo}. Después de analizar el error, por favor propón una solución. Además, proporciona retroalimentación sobre la corrección de tu respuesta y aclara cualquier discrepancia si es necesario. Por favor responde en español`;
    } else {
      return `Según discusiones en varios foros de renombre como Stack Overflow, GitHub Issues, LinkedIn y otras plataformas relacionadas con la programación, se te solicita que abordes el(s) siguiente(s) error(es) proporcionado(s) a continuación: Error(es) encontrados:${prompInfo}. Tu respuesta debe ser exhaustiva y bien informada, extrayendo información de estas plataformas y de cualquier otro recurso de programación relevante. Además, especifica las herramientas y metodologías que utilizas en tu análisis y resolución. Por favor responde en español`;
    }
  };
  
   export const toTitleCase = (texto) => {
      return texto
         .toLowerCase()
         .split(' ')
         .filter(p => p.length > 0)
         .map(p => p.charAt(0).toUpperCase() + p.slice(1))
         .join(' ');
   };

   export const toUpperCaseTrim = (texto) => {
      return texto.trim().toUpperCase();
   };
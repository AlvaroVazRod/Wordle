export interface RespuestaComprobacion {
    resultado: string;
  }
  
  export interface RespuestaPalabra {
    palabra: string;
  }
  export type SlabStatus = 'correct' | 'present' | 'absent' | '';
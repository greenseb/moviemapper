// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       REACT_APP_MAPBOX: string;
//       REACT_APP_API: string;
//     }
//   }
// }

// export {};

export interface ProcessEnv {
  [key: string]: string | undefined;
}

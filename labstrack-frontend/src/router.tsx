import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

//  1. Definela interfaz del contexto que va a usar en el router
interface RouterContextOptions {
  queryClient: QueryClient;
  auth: {
    usuario: any;
    cargando: boolean;
  };
}

// 2. Función para crear el router con el contexto personalizado
export const getRouter = (auth?: { usuario: any; cargando: boolean }) => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { 
      queryClient,
      // Si viene el auth se lo pasa, sino deja un fallback seguro
      auth: auth || { usuario: null, cargando: true } 
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

// 3. Declara el tipado global para que TanStack Router reconozca el contexto en toda la app
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

import { useModalManager } from "~/composables/usePortfolio";

export default defineNuxtRouteMiddleware((to) => {

    const { isOpen, closeAll} = useModalManager();
    if (isOpen) {
      closeAll();
    }

})



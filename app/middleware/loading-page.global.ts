import { useModalManager } from "~/composables/usePortfolio";

export default defineNuxtRouteMiddleware(() => {

    const { isOpen, closeAll} = useModalManager();
    if (isOpen) {
      closeAll();
    }

})



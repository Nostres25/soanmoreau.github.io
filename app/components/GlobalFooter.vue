<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: { }
}
</script>
<template>
    <footer class="p-6 md:p-12 pt-24 md:pt-12 mb-20 md:mb-0 border-t border-gray-200 dark:border-gray-800/60 text-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            <div>
            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">Soan MOREAU</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                Étudiant en BUT Informatique autonome, soucieux du détail et rigoureux.
            </p>
            <div class="flex gap-4">
                <a href="https://fr.linkedin.com/in/soan-moreau" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:text-gray-400 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"><img src="../assets/images/icons/icons8-linkedin.svg" loading="lazy"></a>
                <a href="https://github.com/Nostres25" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:text-gray-400 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"><img src="../assets/images/icons/icons8-github.svg" loading="lazy"></a>
            </div>
            </div>

            <div>
            <h3 id="contact" class="font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                <li class="flex items-center gap-2">
                <span class="text-emerald-500">@</span> soanmoreau5@gmail.com
                </li>
                <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-emerald-500 rounded-full"></span> À la recherche d'une alternance
                </li>
                <li class="flex items-center gap-2 mt-2">
                <a href="/cv.pdf" download class="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                    Télécharger mon CV &rarr;
                </a>
                </li>
            </ul>
            </div>

            <div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-4">Navigation</h3>
            <ul v-for="link in links" :key="link.name" class="space-y-2 text-gray-600 dark:text-gray-400">
                <li><NuxtLink :to="link.path" class="hover:text-emerald-500 transition-colors">{{ link.name }}</NuxtLink></li>
            </ul>
            </div>

        </div>

        <div class="text-center text-gray-500 dark:text-gray-500 pt-8 border-t border-gray-100 dark:border-gray-800/60">
            &copy; 2026 Soan MOREAU. Portfolio réalisé avec Nuxt 4.
        </div>
    </footer>
</template>
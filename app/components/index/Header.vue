<template>
    <header>
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-4">
          <div class="w-40 h-40 shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900 border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden relative">
            <div class="absolute inset-0 flex items-center justify-center text-emerald-500 dark:text-emerald-400 font-bold text-4xl">
              <img src="../../assets/images/nostres_logo.png">   
            </div>
          </div>
          
          <div class="text-center md:text-left flex-1">
            <h1 class="text-4xl font-extrabold tracking-tight mb-2">
              Soan <span class="text-emerald-500">MOREAU</span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
              Étudiant en 2e année de BUT Informatique
            </p>
            
            <div class="inline-block bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-lg font-semibold mb-6 shadow-sm">
              À la recherche d'une alternance en tant que développeur back-end pour Septembre 2026
            </div>
          </div>
        </div>
        <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300" style="text-align: justify;">
            Je suis autodidacte en développement back-end depuis mes 13 ans, c'est-à-dire avant l'IA. J’ai développé en Java pendant 2 ans en toute autonomie puis je me suis ensuite concentré sur un projet NodeJs et Typescript durant 3 ans, avant de me focaliser sur mes études. Ma rapidité d’apprentissage me permet de lancer et d’entretenir un projet de programmation quelle que soit la complexité. J'ajoute que la sécurité, la confidentialité et l'accessibilité ont une place importante pour moi<br>
            Aujourd’hui, je recherche une alternance pour ma troisième année d’études (2026-2027), dans le développement logiciel.
        </p>
        <div class="grid grid-cols-1 mt-4 md:grid-cols-3 gap-8">
            <NuxtLink v-for="link in [{text: 'Mes compétences', href: '#competences'}, {text: 'Mes projets', href:'#projets'}, {text: 'Me contacter', href: '#contact'}]" :key="link.text" :to="link.href" class="px-4 py-2 border border-emerald-600 text-black dark:text-white text-center rounded-lg text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors">
              {{ link.text }} &rarr;
            </NuxtLink>
        </div>
    </header>
</template>
<!-- pages/index.vue -->
<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <!-- Header Profil -->
    <header class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
      <div class="w-40 h-40 shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900 border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden relative">
        <!-- Placeholder Photo -->
        <div class="absolute inset-0 flex items-center justify-center text-emerald-500 dark:text-emerald-400 font-bold text-4xl">
          PN
        </div>
      </div>
      
      <div class="text-center md:text-left flex-1">
        <h1 class="text-4xl font-extrabold tracking-tight mb-2">
          Prénom <span class="text-emerald-500">NOM</span>
        </h1>
        <h2 class="text-xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
          Étudiant en 2e année de BUT Informatique
        </h2>
        
        <div class="inline-block bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-4 py-2 rounded-lg font-semibold mb-6">
          À la recherche d'une alternance — Septembre 2026
        </div>
        
        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
        </p>
      </div>
    </header>

    <hr class="border-gray-200 dark:border-gray-800 mb-12">

    <!-- Grille Informations Rapides (CV) -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Contact -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-emerald-500 transition-colors">
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
          <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
          Contact & Liens
        </h3>
        <ul class="space-y-3 text-gray-600 dark:text-gray-300">
          <li><strong>Email :</strong> prenom.nom@email.com</li>
          <li><strong>GitHub :</strong> github.com/prenom-nom</li>
          <li><strong>LinkedIn :</strong> linkedin.com/in/prenom-nom</li>
          <li><strong>Localisation :</strong> Ville, France</li>
        </ul>
      </div>

      <!-- Atouts / Soft Skills -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-emerald-500 transition-colors">
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
          <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
          Ce qui me caractérise
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">Rigueur</span>
          <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">Travail en équipe</span>
          <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">Curiosité technique</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
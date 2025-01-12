<div class="px-6 py-4 bg-gray-100 rounded-lg shadow-sm">
    <h3 class="text-xl font-semibold text-gray-800">
        Selamat datang, {{ auth()->user()->name }}! 
    </h3>
    <p class="mt-2 text-gray-600">
        Anda sedang PKL di {{ auth()->user()->company }}.
    </p>
</div>

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Rileva se siamo in una sottocartella (controllando il percorso)
    const isSubPage = window.location.pathname.includes("/sedi/");
    const basePath = isSubPage ? "../" : "./";
    const sediPath = isSubPage ? "./" : "./sedi/";

    // 2. Definizione Navbar HTML
    const navbarHTML = `
    <nav id="navbar" class="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md py-3 shadow-sm">
        <div class="container mx-auto px-6 flex justify-between items-center">
            <a href="${basePath}index.html" class="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <i class="fa-solid fa-tooth text-sky-500"></i>
                Dental<span class="text-sky-500">Clique</span>
            </a>

            <div class="hidden md:flex items-center space-x-8">
                <a href="${basePath}index.html" class="text-slate-700 font-medium hover:text-sky-500 transition">Home</a>
                <a href="${basePath}index.html#servizi" class="text-slate-700 font-medium hover:text-sky-500 transition">Trattamenti</a>
                
                <div class="relative group">
                    <button class="text-slate-700 font-medium hover:text-sky-500 transition flex items-center gap-1">
                        Le Nostre Sedi <i class="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                    <div class="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl mt-2 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-slate-100">
                        <a href="${sediPath}livorno-centro.html" class="block px-4 py-2 hover:bg-sky-50 rounded-lg text-sm text-slate-700">Livorno Centro</a>
                        <a href="${sediPath}pisa-centro.html" class="block px-4 py-2 hover:bg-sky-50 rounded-lg text-sm text-slate-700">Pisa Centro</a>
                        <a href="${sediPath}lucca.html" class="block px-4 py-2 hover:bg-sky-50 rounded-lg text-sm text-slate-700">Lucca</a>
                        <a href="${basePath}index.html#cliniche" class="block px-4 py-2 text-sky-600 font-bold text-xs uppercase mt-2 text-center border-t pt-2">Vedi tutte</a>
                    </div>
                </div>

                <a href="#contatti" class="btn-shine bg-sky-600 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-sky-700 transition transform hover:-translate-y-0.5">
                    Prenota Ora
                </a>
            </div>

            <button class="md:hidden text-slate-800 text-2xl">
                <i class="fa-solid fa-bars"></i>
            </button>
        </div>
    </nav>
    `;

    // 3. Definizione Footer HTML
    const footerHTML = `
    <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <a href="#" class="text-2xl font-bold text-white tracking-tight flex items-center gap-2 mb-4">
                        <i class="fa-solid fa-tooth text-sky-500"></i>
                        Dental<span class="text-sky-500">Clique</span>
                    </a>
                    <p class="text-sm">Eccellenza odontoiatrica in tutta la Toscana. Tecnologia avanzata e cura del paziente.</p>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Sedi Principali</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="${sediPath}livorno-centro.html" class="hover:text-white transition">Livorno</a></li>
                        <li><a href="${sediPath}pisa-centro.html" class="hover:text-white transition">Pisa</a></li>
                        <li><a href="${sediPath}lucca.html" class="hover:text-white transition">Lucca</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Orari Call Center</h4>
                    <ul class="space-y-2 text-sm">
                        <li class="flex justify-between"><span>Lun - Ven:</span> <span class="text-white">9:00 - 19:00</span></li>
                        <li class="flex justify-between"><span>Sabato:</span> <span class="text-white">9:00 - 13:00</span></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Contatti</h4>
                    <div class="flex space-x-4">
                        <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
            <div class="border-t border-slate-800 pt-8 text-center text-xs">
                &copy; 2024 Dental Clique. Tutti i diritti riservati.
            </div>
        </div>
    </footer>
    `;

    // 4. Iniezione nell'HTML
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // 5. Inizializzazione AOS (Animazioni)
    if(typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }
});
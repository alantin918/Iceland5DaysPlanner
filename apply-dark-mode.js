const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Regex replacements for Tailwind classes
const replacements = [
    { regex: /bg-white(?! dark:)/g, replace: 'bg-white dark:bg-slate-800' },
    { regex: /bg-gray-50(?! dark:)/g, replace: 'bg-gray-50 dark:bg-slate-800/50' },
    { regex: /bg-gray-100(?! dark:)/g, replace: 'bg-gray-100 dark:bg-slate-800' },
    { regex: /border-gray-100(?! dark:)/g, replace: 'border-gray-100 dark:border-slate-700' },
    { regex: /border-gray-200(?! dark:)/g, replace: 'border-gray-200 dark:border-slate-600' },
    { regex: /text-gray-800(?! dark:)/g, replace: 'text-gray-800 dark:text-slate-100' },
    { regex: /text-gray-600(?! dark:)/g, replace: 'text-gray-600 dark:text-slate-300' },
    { regex: /text-gray-500(?! dark:)/g, replace: 'text-gray-500 dark:text-slate-400' },
    { regex: /text-gray-400(?! dark:)/g, replace: 'text-gray-400 dark:text-slate-500' },
    // Emerald box
    { regex: /bg-emerald-50(?! dark:)/g, replace: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { regex: /border-emerald-100(?! dark:)/g, replace: 'border-emerald-100 dark:border-emerald-800/50' },
    { regex: /border-emerald-200(?! dark:)/g, replace: 'border-emerald-200 dark:border-emerald-800' },
    { regex: /text-emerald-800(?! dark:)/g, replace: 'text-emerald-800 dark:text-emerald-300' },
    { regex: /text-emerald-700(?! dark:)/g, replace: 'text-emerald-700 dark:text-emerald-400' },
    // Blue box
    { regex: /bg-blue-50(?! dark:)/g, replace: 'bg-blue-50 dark:bg-blue-900/30' },
    { regex: /border-blue-100(?! dark:)/g, replace: 'border-blue-100 dark:border-blue-800/50' },
    { regex: /border-blue-200(?! dark:)/g, replace: 'border-blue-200 dark:border-blue-800' },
    { regex: /text-blue-800(?! dark:)/g, replace: 'text-blue-800 dark:text-blue-300' },
    { regex: /text-blue-700(?! dark:)/g, replace: 'text-blue-700 dark:text-blue-400' },
    // Amber box
    { regex: /bg-amber-50(?! dark:)/g, replace: 'bg-amber-50 dark:bg-amber-900/30' },
    { regex: /border-amber-100(?! dark:)/g, replace: 'border-amber-100 dark:border-amber-800/50' },
    { regex: /border-amber-200(?! dark:)/g, replace: 'border-amber-200 dark:border-amber-800' },
    { regex: /text-amber-800(?! dark:)/g, replace: 'text-amber-800 dark:text-amber-300' },
    { regex: /text-amber-700(?! dark:)/g, replace: 'text-amber-700 dark:text-amber-400' },
    // Sky box
    { regex: /bg-sky-50(?! dark:)/g, replace: 'bg-sky-50 dark:bg-sky-900/30' },
    { regex: /border-sky-100(?! dark:)/g, replace: 'border-sky-100 dark:border-sky-800/50' },
    { regex: /border-sky-200(?! dark:)/g, replace: 'border-sky-200 dark:border-sky-800' },
    { regex: /text-sky-800(?! dark:)/g, replace: 'text-sky-800 dark:text-sky-300' },
    { regex: /text-sky-700(?! dark:)/g, replace: 'text-sky-700 dark:text-sky-400' },
    // Red box
    { regex: /bg-red-50(?! dark:)/g, replace: 'bg-red-50 dark:bg-red-900/30' },
    { regex: /border-red-100(?! dark:)/g, replace: 'border-red-100 dark:border-red-800/50' },
    { regex: /border-red-200(?! dark:)/g, replace: 'border-red-200 dark:border-red-800' },
    { regex: /text-red-800(?! dark:)/g, replace: 'text-red-800 dark:text-red-300' },
    { regex: /text-red-700(?! dark:)/g, replace: 'text-red-700 dark:text-red-400' }
];

replacements.forEach(r => {
    content = content.replace(r.regex, r.replace);
});

// 2. Add Tailwind Config & Dark Mode Init
const tailwindConfig = `
    <script>
        tailwind.config = {
            darkMode: 'class',
        }
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>`;
content = content.replace('</head>', tailwindConfig);

// 3. Update <style> block
const oldStyle = `        body { font-family: 'Noto Sans TC', sans-serif; background-color: #f1f5f9; color: #1e293b; }
        .hero-bg {
            background-image: linear-gradient(135deg, rgba(8,15,40,0.72) 0%, rgba(30,58,80,0.82) 100%),
                url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1920&q=80');
            background-size: cover;
            background-position: center;
        }
        .tab-btn { transition: all .2s; }
        .tab-btn.active { background-color: #fff; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,.12); }
        .section-content { display: none; }
        .section-content.active { display: block; }
        .card-hover { transition: box-shadow .2s, transform .2s; }
        .card-hover:hover { box-shadow: 0 12px 32px rgba(0,0,0,.1); transform: translateY(-2px); }`;

const newStyle = `        body { font-family: 'Noto Sans TC', sans-serif; }
        .hero-bg {
            background-image: linear-gradient(135deg, rgba(8,15,40,0.72) 0%, rgba(30,58,80,0.82) 100%),
                url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1920&q=80');
            background-size: cover;
            background-position: center;
        }
        .tab-btn { transition: all .2s; }
        .tab-btn.active { background-color: #fff; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,.12); }
        html.dark .tab-btn.active { background-color: #1e293b; color: #f8fafc; box-shadow: 0 2px 8px rgba(0,0,0,.4); }
        .section-content { display: none; }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .section-content.active { display: block; animation: fadeIn 0.3s ease-out forwards; }
        .card-hover { transition: box-shadow .2s, transform .2s; }
        .card-hover:hover { box-shadow: 0 12px 32px rgba(0,0,0,.1); transform: translateY(-2px); }
        html.dark .card-hover:hover { box-shadow: 0 12px 32px rgba(0,0,0,.4); }`;

content = content.replace(oldStyle, newStyle);

// 4. Update body class
const oldBody = `<body class="antialiased">`;
const newBody = `<body class="antialiased bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">`;
content = content.replace(oldBody, newBody);

// 5. Add toggle button before closing body
const toggleBtn = `
    <!-- Dark Mode Toggle -->
    <button id="theme-toggle" class="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-900/50 border border-gray-100 dark:border-slate-700 flex items-center justify-center text-xl z-50 hover:scale-110 transition-transform">
        <span id="theme-toggle-dark-icon" class="hidden">🌙</span>
        <span id="theme-toggle-light-icon" class="hidden">☀️</span>
    </button>
</body>`;
content = content.replace('</body>', toggleBtn);

// Also fix some specific cases where bg-white dark:bg-slate-800 isn't enough, e.g. the active tab bar background
content = content.replace('bg-white/80', 'bg-white/80 dark:bg-slate-900/80');

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated index.html');

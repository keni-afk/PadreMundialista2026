@echo off
echo ==========================================
echo   SUBIR PADRE MUNDIALISTA 2026 A GITHUB
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/5] Inicializando repositorio git...
git init

echo [2/5] Agregando todos los archivos...
git add .

echo [3/5] Primer commit...
git commit -m "feat: Padre Mundialista 2026 - App corporativa Dia del Padre"

echo [4/5] Renombrando rama a main...
git branch -M main

echo [5/5] Conectando con GitHub y subiendo...
git remote add origin https://github.com/keni-afk/PadreMundialista2026.git
git push -u origin main

echo.
echo ==========================================
echo   LISTO! Ya esta en GitHub.
echo   URL: https://github.com/keni-afk/PadreMundialista2026
echo ==========================================
echo.
pause

#!/bin/bash
set -e

echo "🚀 Installation de Metronic dans FinanceFocus..."

METRONIC_PATH="metronic-v9.4.0/metronic-tailwind-react-starter-kit/typescript/nextjs"
FRONTEND_PATH="frontend/src"

# Vérifier que le dossier Metronic existe
if [ ! -d "$METRONIC_PATH" ]; then
    echo "❌ Erreur: Le dossier Metronic n'existe pas à $METRONIC_PATH"
    exit 1
fi

# Créer les dossiers de destination
echo "📁 Création des dossiers..."
mkdir -p $FRONTEND_PATH/components/metronic
mkdir -p $FRONTEND_PATH/styles/metronic

# Copier les composants UI
echo "📦 Copie des composants UI..."
if [ -d "$METRONIC_PATH/components/ui" ]; then
    cp -r $METRONIC_PATH/components/ui $FRONTEND_PATH/components/metronic/
    echo "✓ Composants UI copiés"
else
    echo "⚠️  Composants UI non trouvés"
fi

# Copier les layouts
echo "📐 Copie des layouts..."
if [ -d "$METRONIC_PATH/components/layouts" ]; then
    cp -r $METRONIC_PATH/components/layouts $FRONTEND_PATH/components/metronic/
    echo "✓ Layouts copiés"
else
    echo "⚠️  Layouts non trouvés"
fi

# Copier screen-loader
if [ -f "$METRONIC_PATH/components/screen-loader.tsx" ]; then
    cp $METRONIC_PATH/components/screen-loader.tsx $FRONTEND_PATH/components/metronic/
    echo "✓ Screen loader copié"
fi

# Copier les hooks
echo "🪝 Copie des hooks..."
if [ -d "$METRONIC_PATH/hooks" ]; then
    cp -r $METRONIC_PATH/hooks $FRONTEND_PATH/
    echo "✓ Hooks copiés"
else
    echo "⚠️  Hooks non trouvés"
fi

# Copier les configs
echo "⚙️  Copie des configs..."
if [ -d "$METRONIC_PATH/config" ]; then
    cp -r $METRONIC_PATH/config $FRONTEND_PATH/
    echo "✓ Configs copiées"
else
    echo "⚠️  Configs non trouvées"
fi

# Copier lib
echo "📚 Copie des utilitaires..."
if [ -d "$METRONIC_PATH/lib" ]; then
    cp -r $METRONIC_PATH/lib $FRONTEND_PATH/
    echo "✓ Lib copiée"
else
    echo "⚠️  Lib non trouvée"
fi

# Copier les styles
echo "🎨 Copie des styles..."
if [ -d "$METRONIC_PATH/styles" ]; then
    cp -r $METRONIC_PATH/styles/* $FRONTEND_PATH/styles/metronic/ 2>/dev/null || true
    echo "✓ Styles copiés"
else
    echo "⚠️  Styles non trouvés"
fi

# Copier les fichiers de config
echo "📝 Copie des fichiers de configuration..."

# Sauvegarder l'ancien tailwind.config s'il existe
if [ -f "frontend/tailwind.config.ts" ]; then
    cp frontend/tailwind.config.ts frontend/tailwind.config.ts.backup
    echo "✓ Backup de tailwind.config.ts créé"
fi

# Copier le nouveau tailwind.config
if [ -f "$METRONIC_PATH/tailwind.config.ts" ]; then
    cp $METRONIC_PATH/tailwind.config.ts frontend/
    echo "✓ tailwind.config.ts copié"
fi

# Copier components.json s'il existe
if [ -f "$METRONIC_PATH/components.json" ]; then
    cp $METRONIC_PATH/components.json frontend/
    echo "✓ components.json copié"
fi

# Installation des dépendances
echo ""
echo "📦 Installation des dépendances npm..."
echo "⚠️  Cette étape peut prendre plusieurs minutes..."
echo ""

cd frontend

npm install \
  @dnd-kit/core@^6.3.1 \
  @dnd-kit/modifiers@^9.0.0 \
  @dnd-kit/sortable@^10.0.0 \
  @hookform/resolvers@^5.2.1 \
  @remixicon/react@^4.6.0 \
  @tanstack/react-query@^5.85.5 \
  @tanstack/react-table@^8.21.3 \
  apexcharts@4.7.0 \
  class-variance-authority@^0.7.1 \
  clsx@^2.1.1 \
  cmdk@^1.1.1 \
  date-fns@^4.1.0 \
  input-otp@^1.4.2 \
  lucide-react@^0.556.0 \
  next-themes@^0.4.6 \
  react-apexcharts@1.7.0 \
  react-aria-components@^1.12.0 \
  react-day-picker@^9.9.0 \
  react-hook-form@^7.68.0 \
  react-resizable-panels@^3.0.5 \
  recharts@2.15.1 \
  sonner@^2.0.7 \
  motion@^12.23.12 \
  tailwind-merge@^3.4.0 \
  tw-animate-css@^1.4.0 \
  vaul@^1.1.2 \
  zod@^4.1.13 \
  embla-carousel-autoplay@8.6.0 \
  embla-carousel-react@8.6.0 \
  @headless-tree/core@^1.4.0 \
  @headless-tree/react@^1.4.0

echo ""
echo "📦 Installation des dépendances de développement..."

npm install --save-dev \
  prettier-plugin-organize-imports@^4.2.0 \
  prettier-plugin-tailwindcss@^0.6.14

cd ..

echo ""
echo "✅ Installation terminée!"
echo ""
echo "📖 Prochaines étapes:"
echo "   1. Consulter METRONIC_INTEGRATION.md pour la configuration"
echo "   2. Mettre à jour tsconfig.json avec les alias de chemins"
echo "   3. Importer les styles Metronic dans globals.css"
echo "   4. Commencer à utiliser les composants!"
echo ""
echo "🚀 Exemple d'utilisation:"
echo "   import { Button } from '@/components/metronic/ui/button';"
echo ""

# Guide d'Intégration de Metronic v9.4.0 dans FinanceFocus

## Vue d'ensemble

Ce guide explique comment intégrer les composants React de Metronic v9.4.0 dans votre projet FinanceFocus Next.js existant.

## Étape 1 : Copier les Composants Metronic

### 1.1 Copier le dossier des composants UI

```bash
# Depuis la racine du projet
cp -r metronic-v9.4.0/metronic-tailwind-react-starter-kit/typescript/nextjs/components/ui frontend/src/components/metronic/ui

# Copier les layouts
cp -r metronic-v9.4.0/metronic-tailwind-react-starter-kit/typescript/nextjs/components/layouts frontend/src/components/metronic/layouts

# Copier les hooks
cp -r metronic-v9.4.0/metronic-tailwind-react-starter-kit/typescript/nextjs/hooks frontend/src/

# Copier les configs
cp -r metronic-v9.4.0/metronic-tailwind-react-starter-kit/typescript/nextjs/config frontend/src/

# Copier les utils
cp -r metronic-v9.4.0/metronic-tailwind-react-starter-kit/typescript/nextjs/lib frontend/src/
```

### 1.2 Copier les styles

```bash
# Copier les styles Metronic
cp -r metronic-v9.4.0/metronic-tailwind-react-starter-kit/typescript/nextjs/styles frontend/src/styles/metronic
```

## Étape 2 : Installer les Dépendances

### 2.1 Dépendances principales

```bash
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
```

### 2.2 Dépendances de développement

```bash
npm install --save-dev \
  prettier-plugin-organize-imports@^4.2.0 \
  prettier-plugin-tailwindcss@^0.6.14
```

## Étape 3 : Configuration Tailwind

### 3.1 Mettre à jour `tailwind.config.ts`

Copier la configuration Tailwind de Metronic :

```bash
cp metronic-v9.4.0/metronic-tailwind-react-starter-kit/typescript/nextjs/tailwind.config.ts frontend/
```

Ou fusionner manuellement les configurations.

### 3.2 Mettre à jour les imports CSS

Dans `frontend/src/app/globals.css` ou `layout.tsx`, ajouter :

```css
@import '../styles/metronic/base.css';
@import '../styles/metronic/components.css';
```

## Étape 4 : Configuration des Alias TypeScript

### 4.1 Mettre à jour `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/metronic/*": ["./src/components/metronic/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/config/*": ["./src/config/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

## Étape 5 : Utiliser les Composants Metronic

### 5.1 Exemple : Utiliser un Button Metronic

```tsx
import { Button } from '@/metronic/ui/button';

export default function MyComponent() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  );
}
```

### 5.2 Exemple : Utiliser un Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/metronic/ui/card';

export default function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Summary</CardTitle>
        <CardDescription>Your monthly budget overview</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Your content */}
      </CardContent>
    </Card>
  );
}
```

### 5.3 Exemple : Utiliser un Layout Metronic

```tsx
import { DefaultLayout } from '@/metronic/layouts/default-layout';

export default function DashboardPage() {
  return (
    <DefaultLayout>
      <h1>Dashboard</h1>
      {/* Your content */}
    </DefaultLayout>
  );
}
```

## Étape 6 : Thème et Mode Sombre

### 6.1 Configurer le ThemeProvider

Dans `frontend/src/app/layout.tsx` :

```tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 6.2 Utiliser le Theme Toggle

```tsx
import { ThemeToggle } from '@/metronic/ui/theme-toggle';

export function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

## Étape 7 : Composants Metronic Utiles

### Navigation & Menus
- `@/metronic/ui/menu` - Menu déroulant
- `@/metronic/ui/dropdown` - Dropdown
- `@/metronic/ui/tabs` - Onglets
- `@/metronic/ui/breadcrumb` - Fil d'Ariane

### Formulaires
- `@/metronic/ui/input` - Champ de saisie
- `@/metronic/ui/select` - Liste déroulante
- `@/metronic/ui/checkbox` - Case à cocher
- `@/metronic/ui/radio-group` - Boutons radio
- `@/metronic/ui/form` - Wrapper de formulaire

### Affichage de Données
- `@/metronic/ui/table` - Tableau
- `@/metronic/ui/card` - Carte
- `@/metronic/ui/badge` - Badge
- `@/metronic/ui/avatar` - Avatar

### Feedback & Interaction
- `@/metronic/ui/alert` - Alerte
- `@/metronic/ui/toast` - Notification
- `@/metronic/ui/dialog` - Dialogue modal
- `@/metronic/ui/popover` - Popover
- `@/metronic/ui/tooltip` - Info-bulle

### Graphiques
- `@/metronic/ui/chart` - Graphiques ApexCharts
- `@/metronic/ui/progress` - Barre de progression

## Étape 8 : Migration Progressive

### Option 1 : Remplacement Complet
Remplacer tous vos composants existants par les composants Metronic.

### Option 2 : Migration Progressive
1. Créer un nouveau layout avec Metronic pour les nouvelles pages
2. Garder l'ancien design pour les pages existantes
3. Migrer page par page

### Option 3 : Utilisation Hybride
Utiliser Metronic uniquement pour certains composants (formulaires, tableaux, etc.)

## Étape 9 : Personnalisation

### 9.1 Personnaliser les Couleurs

Dans `tailwind.config.ts` :

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Votre couleur principale
          // ... autres nuances
        },
      },
    },
  },
};
```

### 9.2 Personnaliser les Composants

Créer des variants personnalisés dans `frontend/src/components/custom` :

```tsx
import { Button } from '@/metronic/ui/button';
import { cn } from '@/lib/utils';

export function PrimaryButton({ className, ...props }) {
  return (
    <Button 
      className={cn('bg-blue-500 hover:bg-blue-600', className)}
      {...props}
    />
  );
}
```

## Étape 10 : Vérification

### 10.1 Tester l'intégration

```bash
npm run dev
```

### 10.2 Vérifier les imports

Créer une page de test avec plusieurs composants Metronic pour vérifier que tout fonctionne.

## Dépannage

### Problème : Erreurs d'import

**Solution** : Vérifier les alias dans `tsconfig.json` et `next.config.ts`

### Problème : Styles non appliqués

**Solution** : Vérifier que les imports CSS sont dans le bon ordre dans `globals.css`

### Problème : Conflits de styles

**Solution** : Utiliser `tw-merge` pour fusionner les classes Tailwind proprement

### Problème : Composants non trouvés

**Solution** : Vérifier que tous les fichiers ont été copiés correctement

## Script d'Installation Automatique

Créer `install-metronic.sh` :

```bash
#!/bin/bash
set -e

echo "🚀 Installation de Metronic dans FinanceFocus..."

METRONIC_PATH="metronic-v9.4.0/metronic-tailwind-react-starter-kit/typescript/nextjs"
FRONTEND_PATH="frontend/src"

# Créer les dossiers
mkdir -p $FRONTEND_PATH/components/metronic
mkdir -p $FRONTEND_PATH/styles/metronic

# Copier les composants
echo "📦 Copie des composants..."
cp -r $METRONIC_PATH/components/ui $FRONTEND_PATH/components/metronic/
cp -r $METRONIC_PATH/components/layouts $FRONTEND_PATH/components/metronic/

# Copier les hooks et configs
echo "🔧 Copie des hooks et configs..."
cp -r $METRONIC_PATH/hooks $FRONTEND_PATH/
cp -r $METRONIC_PATH/config $FRONTEND_PATH/
cp -r $METRONIC_PATH/lib $FRONTEND_PATH/

# Copier les styles
echo "🎨 Copie des styles..."
cp -r $METRONIC_PATH/styles/* $FRONTEND_PATH/styles/metronic/

# Installer les dépendances
echo "📚 Installation des dépendances..."
cd frontend
npm install # (liste des packages ci-dessus)

echo "✅ Installation terminée!"
echo "📖 Consultez METRONIC_INTEGRATION.md pour les prochaines étapes"
```

## Ressources

- [Documentation Metronic](https://preview.keenthemes.com/metronic8/react/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/) - Les composants Metronic sont basés sur shadcn/ui
- [Radix UI](https://www.radix-ui.com/) - Composants headless utilisés

## Conclusion

Après cette intégration :
- Vous aurez accès à 50+ composants UI professionnels
- Un design system cohérent
- Des layouts pré-construits
- Support du mode sombre
- Accessibilité intégrée

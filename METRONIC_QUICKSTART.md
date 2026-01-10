# Guide Rapide : Intégration Metronic en 5 Minutes

## 🚀 Installation Express

```bash
# 1. Rendre le script exécutable (si ce n'est pas déjà fait)
chmod +x install-metronic.sh

# 2. Exécuter le script d'installation
./install-metronic.sh
```

Le script va automatiquement :
- ✅ Copier tous les composants Metronic
- ✅ Copier les hooks, configs, et utilitaires
- ✅ Copier les styles
- ✅ Installer toutes les dépendances npm

⏱️ Durée estimée : 3-5 minutes

## 📝 Configuration Post-Installation

### 1. Mettre à jour `tsconfig.json`

Ajouter ces alias dans `frontend/tsconfig.json` :

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/metronic/*": ["./src/components/metronic/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/config/*": ["./src/config/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

### 2. Mettre à jour `next.config.ts` (optionnel)

Si nécessaire, ajouter les alias webpack :

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/metronic': path.resolve(__dirname, 'src/components/metronic'),
    };
    return config;
  },
};

export default nextConfig;
```

### 3. Importer les styles dans `globals.css`

Ajouter au début de `frontend/src/app/globals.css` :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Metronic styles - Ajouter ces lignes */
@import '../styles/metronic/base.css';
@import '../styles/metronic/components.css';
```

### 4. Configurer le Theme Provider (optionnel)

Dans `frontend/src/app/layout.tsx` :

```tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 🎯 Premier Test

### Créer une page de test

`frontend/src/app/test-metronic/page.tsx` :

```tsx
import { Button } from '@/components/metronic/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/metronic/ui/card';

export default function TestMetronic() {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Metronic est installé ! 🎉</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Les composants fonctionnent correctement.</p>
          <Button>Cliquez-moi</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Tester

```bash
cd frontend
npm run dev
```

Ouvrir : `http://localhost:3000/test-metronic`

## 📚 Composants les Plus Utiles

### Boutons
```tsx
import { Button } from '@/components/metronic/ui/button';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Cartes
```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/metronic/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Contenu de la carte
  </CardContent>
</Card>
```

### Formulaires
```tsx
import { Input } from '@/components/metronic/ui/input';
import { Label } from '@/components/metronic/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/metronic/ui/select';

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="email@example.com" />
</div>

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Sélectionner" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Tableaux
```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/metronic/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nom</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Badges
```tsx
import { Badge } from '@/components/metronic/ui/badge';

<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
```

### Alertes
```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/metronic/ui/alert';

<Alert>
  <AlertTitle>Attention</AlertTitle>
  <AlertDescription>Ceci est un message important.</AlertDescription>
</Alert>
```

### Dialogues/Modales
```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/metronic/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Ouvrir Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Titre du dialogue</DialogTitle>
      <DialogDescription>Description du dialogue</DialogDescription>
    </DialogHeader>
    <div>Contenu du dialogue</div>
  </DialogContent>
</Dialog>
```

## 🎨 Personnalisation Rapide

### Changer les couleurs principales

Dans `tailwind.config.ts` :

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Bleu
          foreground: '#FFFFFF',
        },
      },
    },
  },
};
```

### Créer un composant personnalisé

```tsx
import { Button } from '@/components/metronic/ui/button';
import { cn } from '@/lib/utils';

export function PrimaryButton({ className, ...props }) {
  return (
    <Button
      className={cn('bg-blue-600 hover:bg-blue-700', className)}
      {...props}
    />
  );
}
```

## 🔍 Exemple Complet : Page Budget

Voir le fichier `dashboard-metronic-example.tsx` pour un exemple complet d'une page utilisant les composants Metronic.

## 📖 Ressources

- **Documentation complète** : `METRONIC_INTEGRATION.md`
- **Exemple de page** : `frontend/src/app/dashboard-metronic-example.tsx`
- **Documentation Metronic officielle** : [https://preview.keenthemes.com/metronic8/react/docs](https://preview.keenthemes.com/metronic8/react/docs)
- **Composants shadcn/ui** : [https://ui.shadcn.com/](https://ui.shadcn.com/)

## 🐛 Dépannage

### Erreur : Cannot find module '@/components/metronic/ui/button'

**Solution** : Vérifier que les alias sont bien configurés dans `tsconfig.json`

### Erreur : Module not found: Can't resolve 'xxx'

**Solution** : Relancer l'installation des dépendances
```bash
cd frontend && npm install
```

### Les styles ne s'appliquent pas

**Solution** : Vérifier que les imports CSS sont dans `globals.css`

### Redémarrer le serveur

Après l'installation, toujours redémarrer le serveur :
```bash
cd frontend
npm run dev
```

## ✅ Checklist

- [ ] Script d'installation exécuté
- [ ] Dépendances npm installées
- [ ] Alias ajoutés dans `tsconfig.json`
- [ ] Styles importés dans `globals.css`
- [ ] ThemeProvider configuré (optionnel)
- [ ] Page de test créée et fonctionnelle
- [ ] Serveur redémarré

## 🎉 C'est Parti !

Vous êtes maintenant prêt à utiliser les 50+ composants Metronic dans votre application FinanceFocus !

Commencez par remplacer vos composants existants progressivement pour un design professionnel et cohérent.

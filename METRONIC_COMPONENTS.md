# 📦 Liste Complète des Composants Metronic Disponibles

## 🎯 Total : 77+ Composants React

## 📋 Navigation & Menus

- **accordion-menu.tsx** - Menu accordéon
- **accordion.tsx** - Accordéon standard
- **breadcrumb.tsx** - Fil d'Ariane
- **context-menu.tsx** - Menu contextuel (clic droit)
- **dropdown-menu.tsx** - Menu déroulant
- **menubar.tsx** - Barre de menu
- **navigation-menu.tsx** - Menu de navigation
- **tabs.tsx** - Onglets

## 🔘 Boutons & Actions

- **button.tsx** - Bouton standard
- **toggle.tsx** - Bouton bascule
- **toggle-group.tsx** - Groupe de bascules
- **github-button.tsx** - Bouton GitHub stylisé

## 📝 Formulaires & Inputs

### Champs de saisie
- **input.tsx** - Champ texte
- **input-otp.tsx** - Code OTP
- **textarea.tsx** - Zone de texte
- **datefield.tsx** - Sélecteur de date
- **calendar.tsx** - Calendrier
- **timefield.tsx** - Sélecteur d'heure

### Sélection
- **select.tsx** - Liste déroulante
- **checkbox.tsx** - Case à cocher
- **radio-group.tsx** - Boutons radio
- **switch.tsx** - Interrupteur
- **slider.tsx** - Curseur

### Avancé
- **form.tsx** - Wrapper de formulaire
- **file-upload.tsx** - Upload de fichiers
- **command.tsx** - Palette de commandes (⌘K)
- **combobox.tsx** - Combo box (autocomplete)

## 🎴 Cartes & Conteneurs

- **card.tsx** - Carte de contenu
- **collapsible.tsx** - Conteneur repliable
- **resizable.tsx** - Panneau redimensionnable
- **separator.tsx** - Séparateur
- **aspect-ratio.tsx** - Ratio d'aspect

## 📊 Tableaux & Grilles

- **table.tsx** - Tableau basique
- **data-grid.tsx** - Grille de données avancée
- **data-grid-table.tsx** - Table avec tri/filtre
- **data-grid-table-dnd.tsx** - Table avec drag & drop
- **data-grid-table-dnd-rows.tsx** - Lignes draggables
- **data-grid-column-filter.tsx** - Filtres de colonnes
- **data-grid-column-header.tsx** - En-têtes personnalisés
- **data-grid-column-visibility.tsx** - Visibilité des colonnes
- **data-grid-pagination.tsx** - Pagination
- **tree-view.tsx** - Vue arborescente

## 📈 Graphiques & Visualisation

- **chart.tsx** - Graphiques (ApexCharts)
- **progress.tsx** - Barre de progression
- **progress-circle.tsx** - Progrès circulaire
- **rating.tsx** - Notation par étoiles
- **counting-number.tsx** - Compteur animé

## 🎨 Affichage & Media

- **avatar.tsx** - Avatar utilisateur
- **avatar-group.tsx** - Groupe d'avatars
- **badge.tsx** - Badge/Étiquette
- **carousel.tsx** - Carrousel d'images
- **image-comparison.tsx** - Comparaison d'images
- **timeline.tsx** - Timeline

## 💬 Feedback & Notifications

- **alert.tsx** - Message d'alerte
- **alert-dialog.tsx** - Dialogue d'alerte
- **toast.tsx** - Notification toast
- **sonner.tsx** - Notifications Sonner
- **skeleton.tsx** - Skeleton loader

## 🪟 Modales & Overlays

- **dialog.tsx** - Dialogue modal
- **drawer.tsx** - Tiroir latéral
- **popover.tsx** - Popover
- **hover-card.tsx** - Carte au survol
- **tooltip.tsx** - Info-bulle
- **sheet.tsx** - Sheet (panneau latéral)

## 🎭 Visuels & Animations

- **gradient-background.tsx** - Fond dégradé
- **grid-background.tsx** - Fond grille
- **hover-background.tsx** - Fond au survol
- **meteor-effect.tsx** - Effet météores
- **particles-effect.tsx** - Effet particules
- **spotlight-card.tsx** - Carte avec spot

## 🔍 Utilitaires

- **code.tsx** - Bloc de code
- **label.tsx** - Label de formulaire
- **scroll-area.tsx** - Zone de scroll
- **pagination.tsx** - Pagination
- **keycap.tsx** - Touche de clavier
- **logo.tsx** - Logo
- **theme-toggle.tsx** - Bascule thème clair/sombre

## 📱 Layout & Structure

- **default-layout.tsx** - Layout par défaut
- Autres layouts disponibles dans `/components/metronic/layouts/`

## 🎯 Composants Spécialisés

- **page-content.tsx** - Contenu de page
- **pdf-viewer.tsx** - Visionneuse PDF
- **portal.tsx** - Portail React
- **responsive-menu.tsx** - Menu responsive
- **visually-hidden.tsx** - Masquage visuel (a11y)

## 📖 Comment Utiliser

### Import Standard
```tsx
import { Button } from '@/components/metronic/ui/button';
import { Card, CardHeader, CardContent } from '@/components/metronic/ui/card';
import { Input } from '@/components/metronic/ui/input';
```

### Exemple Complet
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/metronic/ui/card';
import { Button } from '@/components/metronic/ui/button';
import { Input } from '@/components/metronic/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/metronic/ui/select';
import { Badge } from '@/components/metronic/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/metronic/ui/alert';

export default function MyPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mon Formulaire</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Nom" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option 1</SelectItem>
            </SelectContent>
          </Select>
          <Button>Envoyer</Button>
        </CardContent>
      </Card>

      <Alert>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>Votre formulaire a été envoyé.</AlertDescription>
      </Alert>
    </div>
  );
}
```

## 🎨 Variants Disponibles

### Button
- `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- Tailles : `default`, `sm`, `lg`, `icon`

### Badge
- `default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `info`

### Alert
- `default`, `destructive`, `success`, `warning`, `info`

### Card
- Aucun variant (personnalisable via className)

## 📚 Documentation

- **Guide rapide** : `METRONIC_QUICKSTART.md`
- **Documentation complète** : `METRONIC_INTEGRATION.md`
- **Exemple de page** : `dashboard-metronic-example.tsx`

## 🔗 Ressources

- [Documentation Metronic](https://preview.keenthemes.com/metronic8/react/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**77+ composants professionnels prêts à l'emploi !** 🎉

Tous accessibles, responsive, et avec support du mode sombre intégré.

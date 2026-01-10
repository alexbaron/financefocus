# Table des Paramètres (Parameters)

## Description
La table `parameters` centralise toutes les valeurs paramétrables de l'application, notamment les catégories de dépenses et de revenus.

## Structure

| Champ | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Identifiant unique auto-incrémenté |
| `mnemo` | VARCHAR(50) | Mnémonique technique (ex: ALIMENTATION) |
| `value` | VARCHAR(255) | Valeur affichée (ex: Alimentation) |
| `order_position` | INTEGER | Ordre d'affichage |
| `type` | VARCHAR(150) | Type de paramètre (ex: EXPENSE_CATEGORY) |

## Contraintes
- **Index unique** : `(type, mnemo)` - Garantit l'unicité de la combinaison type/mnémonique
- **Index** : `(type)` - Optimise les recherches par type

## Types de Paramètres

### EXPENSE_CATEGORY (Catégories de dépenses)
| Mnemo | Valeur | Ordre |
|-------|--------|-------|
| ALIMENTATION | Alimentation | 1 |
| TRANSPORT | Transport | 2 |
| LOGEMENT | Logement | 3 |
| LOISIRS | Loisirs | 4 |
| SANTE | Santé | 5 |
| VETEMENTS | Vêtements | 6 |
| EDUCATION | Éducation | 7 |
| SERVICES | Services | 8 |
| ASSURANCES | Assurances | 9 |
| EPARGNE | Épargne | 10 |
| IMPOTS | Impôts et taxes | 11 |
| AUTRES | Autres | 99 |

### INCOME_CATEGORY (Catégories de revenus)
| Mnemo | Valeur | Ordre |
|-------|--------|-------|
| SALAIRE | Salaire | 1 |
| PRIME | Prime | 2 |
| FREELANCE | Freelance / Indépendant | 3 |
| INVESTISSEMENT | Investissements | 4 |
| LOCATION | Revenus locatifs | 5 |
| PENSION | Pension / Retraite | 6 |
| ALLOCATION | Allocations | 7 |
| AUTRES | Autres revenus | 99 |

### BUDGET_TYPE (Types de transactions)
| Mnemo | Valeur | Ordre |
|-------|--------|-------|
| INCOME | Revenu | 1 |
| EXPENSE | Dépense | 2 |
| SAVINGS | Épargne | 3 |
| CAPITAL | Capital | 4 |

## API Endpoints

### Récupérer tous les paramètres
```bash
GET /api/parameters
```

**Réponse :**
```json
{
  "EXPENSE_CATEGORY": [...],
  "INCOME_CATEGORY": [...],
  "BUDGET_TYPE": [...]
}
```

### Récupérer les paramètres par type
```bash
GET /api/parameters/{TYPE}
```

**Exemple :**
```bash
GET /api/parameters/EXPENSE_CATEGORY
```

**Réponse :**
```json
[
  {
    "id": 1,
    "mnemo": "ALIMENTATION",
    "value": "Alimentation",
    "order": 1
  },
  ...
]
```

### Raccourcis disponibles
```bash
GET /api/parameters/expense-categories  # Alias pour EXPENSE_CATEGORY
GET /api/parameters/income-categories   # Alias pour INCOME_CATEGORY
```

## Utilisation dans le Code

### Backend (Symfony)
```php
// Récupérer les catégories de dépenses
$expenseCategories = $parameterRepository->findByType('EXPENSE_CATEGORY');

// Récupérer un paramètre spécifique
$param = $parameterRepository->findByTypeAndMnemo('EXPENSE_CATEGORY', 'ALIMENTATION');

// Récupérer tous les types disponibles
$types = $parameterRepository->findAllTypes();
```

### Frontend (React/Next.js)
```typescript
// Charger les catégories de dépenses
const response = await api.get('/parameters/EXPENSE_CATEGORY');
const categories = response.data;

// Utiliser dans un select
<select>
  {categories.map(cat => (
    <option key={cat.id} value={cat.value}>
      {cat.value}
    </option>
  ))}
</select>
```

## Ajouter de Nouveaux Paramètres

### Via SQL
```sql
INSERT INTO parameters (mnemo, value, order_position, type) 
VALUES ('NOUVEAU', 'Nouvelle Catégorie', 12, 'EXPENSE_CATEGORY');
```

### Via Migration Doctrine
Créer une nouvelle migration pour ajouter des paramètres supplémentaires.

## Bonnes Pratiques

1. **Mnémoniques** : Toujours en MAJUSCULES, sans espaces ni caractères spéciaux
2. **Ordre** : Utiliser des multiples de 10 pour faciliter l'insertion ultérieure (10, 20, 30...)
3. **Type** : Utiliser un format cohérent avec UNDERSCORE (ex: `EXPENSE_CATEGORY`)
4. **Valeurs spéciales** : Utiliser 99 pour "Autres" ou éléments de fallback

## Évolutivité

Pour ajouter un nouveau type de paramètre :
1. Définir le nouveau type (ex: `PAYMENT_METHOD`)
2. Créer une migration avec les valeurs initiales
3. Ajouter un raccourci d'endpoint si nécessaire dans `ParameterController`
4. Mettre à jour cette documentation

## Exemples d'Utilisation

### Dropdown dynamique
Les composants `ExpenseDetails` et `IncomeDetails` chargent automatiquement leurs catégories depuis cette table.

### Validation
Les catégories peuvent être validées côté backend en vérifiant qu'elles existent dans la table parameters.

### Multi-langue
Pour supporter plusieurs langues, ajouter un champ `locale` et dupliquer les entrées pour chaque langue.

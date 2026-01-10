// Exemple d'utilisation des composants Metronic dans FinanceFocus
// frontend/src/app/dashboard-metronic/page.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/metronic/ui/card';
import { Button } from '@/components/metronic/ui/button';
import { Badge } from '@/components/metronic/ui/badge';
import { Input } from '@/components/metronic/ui/input';
import { Label } from '@/components/metronic/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/metronic/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/metronic/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/metronic/ui/alert';
import { RiMoneyEuroCircleLine, RiWalletLine, RiLineChartLine, RiBankLine } from '@remixicon/react';

export default function DashboardMetronic() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Financier</h1>
          <p className="text-muted-foreground">Vue d&apos;ensemble de vos finances</p>
        </div>
        <Button size="lg">
          <RiMoneyEuroCircleLine className="mr-2 h-4 w-4" />
          Nouvelle Transaction
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus du Mois</CardTitle>
            <RiMoneyEuroCircleLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,245.00 €</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="success" className="mr-1">+12%</Badge>
              par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
            <RiWalletLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,892.50 €</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="destructive" className="mr-1">+5%</Badge>
              par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Épargne</CardTitle>
            <RiBankLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,352.50 €</div>
            <p className="text-xs text-muted-foreground">
              Ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solde Total</CardTitle>
            <RiLineChartLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450.00 €</div>
            <p className="text-xs text-muted-foreground">
              Tous comptes confondus
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alert */}
      <Alert>
        <AlertTitle>Taux de change mis à jour</AlertTitle>
        <AlertDescription>
          Le taux EUR/CAD a été mis à jour : 1 EUR = 1.6089 CAD
        </AlertDescription>
      </Alert>

      {/* Two Column Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Formulaire d'ajout */}
        <Card>
          <CardHeader>
            <CardTitle>Ajouter une Transaction</CardTitle>
            <CardDescription>Enregistrez rapidement vos revenus ou dépenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Revenu</SelectItem>
                  <SelectItem value="expense">Dépense</SelectItem>
                  <SelectItem value="savings">Épargne</SelectItem>
                  <SelectItem value="capital">Capital</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alimentation">Alimentation</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="logement">Logement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Ex: Courses du mois" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount-eur">Montant EUR</Label>
                <Input id="amount-eur" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount-cad">Montant CAD</Label>
                <Input id="amount-cad" type="number" placeholder="0.00" />
              </div>
            </div>

            <Button className="w-full">Enregistrer</Button>
          </CardContent>
        </Card>

        {/* Transactions récentes */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions Récentes</CardTitle>
            <CardDescription>Vos dernières opérations financières</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>01/01/2026</TableCell>
                  <TableCell>
                    <div className="font-medium">Salaire</div>
                    <div className="text-sm text-muted-foreground">Revenu</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-green-600 font-medium">+3,000.00 €</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>31/12/2025</TableCell>
                  <TableCell>
                    <div className="font-medium">Courses</div>
                    <div className="text-sm text-muted-foreground">Alimentation</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-red-600 font-medium">-85.50 €</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>30/12/2025</TableCell>
                  <TableCell>
                    <div className="font-medium">Transport</div>
                    <div className="text-sm text-muted-foreground">Transport</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-red-600 font-medium">-45.00 €</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

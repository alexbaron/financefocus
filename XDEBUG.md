# Xdebug Configuration for FinanceFocus

Xdebug est maintenant installé et configuré dans le container backend.

## Configuration

### Paramètres Xdebug (`backend/docker/xdebug.ini`):
- **Mode**: debug, develop
- **Client Host**: host.docker.internal
- **Port**: 9003
- **IDE Key**: PHPSTORM
- **Start with request**: yes

## Configuration IDE

### VS Code
1. Installez l'extension **PHP Debug** (xdebug.php-debug)
2. Créez `.vscode/launch.json` à la racine du projet:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for Xdebug",
            "type": "php",
            "request": "launch",
            "port": 9003,
            "pathMappings": {
                "/var/www/symfony": "${workspaceFolder}/backend"
            },
            "log": true
        }
    ]
}
```

3. Appuyez sur F5 ou cliquez sur "Run and Debug" > "Listen for Xdebug"

### PHPStorm
1. Ouvrez **Settings** > **PHP** > **Debug**
2. Configurez le port Xdebug: **9003**
3. Allez dans **Settings** > **PHP** > **Servers**
4. Créez un nouveau serveur:
   - Name: `financefocus`
   - Host: `localhost`
   - Port: `8443`
   - Debugger: `Xdebug`
   - Use path mappings: ✓
   - Mapping: `backend` → `/var/www/symfony`
5. Activez "Start Listening for PHP Debug Connections" (icône téléphone)

## Utilisation

1. Placez des breakpoints dans votre code PHP
2. Démarrez le debugger dans votre IDE
3. Faites une requête à l'API (ex: `https://localhost:8443/api/login`)
4. Le debugger s'arrêtera aux breakpoints

## Vérification

```bash
# Vérifier que Xdebug est chargé
docker exec -it financefocus-backend php -v
# Devrait afficher: "with Xdebug v3.x.x"

# Voir la configuration Xdebug
docker exec -it financefocus-backend php -i | grep xdebug
```

## Logs

Les logs Xdebug sont disponibles dans le container:
```bash
docker exec -it financefocus-backend tail -f /tmp/xdebug.log
```

# mnm

## Commande pour changer de version
npx ng update @angular/core@14 @angular/cli@14

## Déroulement du processus:

The installed Angular CLI version is outdated.
Installing a temporary Angular CLI versioned 14.2.1 to perform the update.
✔ Package successfully installed.
Using package manager: npm
Collecting installed dependencies...
Found 25 dependencies.
Fetching dependency metadata from registry...
    Updating package.json with dependency @angular-devkit/build-angular @ "14.2.1" (was "13.3.4")...
    Updating package.json with dependency @angular/cli @ "14.2.1" (was "13.3.4")...
    Updating package.json with dependency @angular/compiler-cli @ "14.2.0" (was "13.3.5")...
    Updating package.json with dependency @angular/animations @ "14.2.0" (was "13.3.5")...
    Updating package.json with dependency @angular/common @ "14.2.0" (was "13.3.5")...
    Updating package.json with dependency @angular/compiler @ "14.2.0" (was "13.3.5")...
    Updating package.json with dependency @angular/core @ "14.2.0" (was "13.3.5")...
    Updating package.json with dependency @angular/forms @ "14.2.0" (was "13.3.5")...
    Updating package.json with dependency @angular/platform-browser @ "14.2.0" (was "13.3.5")...
    Updating package.json with dependency @angular/platform-browser-dynamic @ "14.2.0" (was "13.3.5")...
    Updating package.json with dependency @angular/router @ "14.2.0" (was "13.3.5")...
UPDATE package.json (1127 bytes)
✔ Packages successfully installed.
** Executing migrations of package '@angular/cli' **

> Remove 'defaultProject' option from workspace configuration.
  The project to use will be determined from the current working directory.
UPDATE angular.json (3099 bytes)
  Migration completed.

> Remove 'showCircularDependencies' option from browser and server builders.
  Migration completed.

> Replace 'defaultCollection' option in workspace configuration with 'schematicCollections'.
  Migration completed.

> Update Angular packages 'dependencies' and 'devDependencies' version prefix to '^' instead of '~'.
UPDATE package.json (1127 bytes)
✔ Packages installed successfully.
  Migration completed.

> Remove 'package.json' files from library projects secondary entrypoints.
  Migration completed.

> Update TypeScript compilation target to 'ES2020'.
UPDATE tsconfig.json (941 bytes)
  Migration completed.

** Executing migrations of package '@angular/core' **

> As of Angular version 13, `entryComponents` are no longer necessary.
  Migration completed.

> In Angular version 14, the `pathMatch` property of `Routes` was updated to be a strict union of the two valid options: `'full'|'prefix'`.
  `Routes` and `Route` variables need an explicit type so TypeScript does not infer the property as the looser `string`.
  Migration completed.

> As of Angular version 14, Forms model classes accept a type parameter, and existing usages must be opted out to preserve backwards-eserve backwards-compatibility.
UPDATE src/app/Pages/connection/connection.component.ts (1497 bytes)
UPDATE src/app/Pages/inscription/inscription.component.ts (1142 bytes)
UPDATE src/app/Pages/update-account/update-account.component.ts (3690 bytes)
UPDATE src/app/Pages/travel/travel.component.ts (3532 bytes)
UPDATE src/app/Pages/add-car/add-car.component.ts (1723 bytes)
UPDATE src/app/Pages/admin-login/admin-login.component.ts (1457 bytes)
UPDATE src/app/Pages/add-travel/add-travel.component.ts (2628 bytes)
UPDATE src/app/Pages/add-message/add-message.component.ts (1681 bytes)
  Migration completed.
  
  ### commentaire
  
  il ne me semble pas que cela créer des soucis, mais je n'ai pas test toutes vos fonctionnalités pour en être certain.

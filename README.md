This application automates the migration/release of 'configurations' from an environment to another. 
This solves the issue of the need to manually configure say production with tested configurations in the test environment. 
It allows for consistent updates that are less likely manually while providing the ability to pick and choose the configurations to migrate.

The front end UI is an SPA built using Angular while the backend is a RESTful service with HATEOAS built using Scala, SpringBoot, Spring JPA and H2 in memory database (It can be any SQL database, thanks to Spring JPA).

Functionality:
1. Add and remove 'configuration items' into/from a 'package'.
2. Create and view packages.
3. Update and commit packages for migration/release.
4. Connect to multiple external environments and migrate packages alongwith from source to the target environment. 

*gnu is an antelope species found in Africa known for mass migration in search of food.*

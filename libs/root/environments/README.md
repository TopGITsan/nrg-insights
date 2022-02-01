# root Environments

- there is one caviat to this:
  - it does not work as a buildable library
  - buildable libraries must depende only on buildable libraries
  - so if u r using incremental built => don't do this
  - buildable libraries don't suport the file replacemnts

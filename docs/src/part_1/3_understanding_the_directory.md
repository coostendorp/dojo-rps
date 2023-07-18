# Understanding the Directory

After cloning the git repository, the reader should be faced with the following directory:
1. contracts - this is where all the smart contracts are stored.
2. docs - this is where all the documentation to this tutorial is stored
3. web - this is where the ReactJS front end code is written. This takes inspiration from MUD but there are also tweaks here and there to conform to Dojo.

## Contracts
This is where all the smart contracts are kept. They are all written in Cairo. Under the "src" directory
lies all the components, entities, and systems. 

### Components

The components directory is ideally separated by each
component. It's recommended that the following macros be used:
````
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
````

### Systems
Ideally each system is its own Cairo file to help separate systems from one another. Each system
has to have the execute function. This is necessary for the execution of each system. Each execute
function must have dojo::world::Context as it's first parameter.

### Tests
Tests are a great way to make sure that the systems, entities, and function work as coded. Do not
forget to use the test macro when writing tests:
````
#[test]
````

As a useful tip to test using a different signer, take note of the following syntax:
````
starknet::testing::set_contract_address(<INSERT_SIGNER_ADDRESS_HERE>);
````


Feel free to make adjustments as necessary. This tutorial does not aim to create a strict way to develop
using Dojo, but to enhance the Dojo experience and streamline it further to extend its reach in the
Web3 World.
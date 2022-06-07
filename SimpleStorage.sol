// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {
    uint256 favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    // uint256[] public anArray of People assigned as people
    People[] public people;

    // map a name (string) to a number - attach a favorite number to a person's name
    mapping(string => uint256) public nameToFavoriteNumber;

    // store _favoriteNumber in the favoriteNumber variable
    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    // retrieve favoriteNumber—view and pure functions do not cost gas
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // create a person and add them to the people array (with a name and favorite number)
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}

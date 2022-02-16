// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./ERC721A.sol";
import "./Ownable.sol";
import "./PaymentSplitter.sol";
import "./Counters.sol";

interface ISecondContract {
    function balanceOf(address) external view returns (uint);
}

contract RichApesClub is ERC721A, Ownable, PaymentSplitter {
    using Strings for uint256;
    using Counters for Counters.Counter;

    uint256 public maxMintSupply = 10000;
    uint256 public limitPerWallet = 30;

    string public baseURI;

    bool public publicState = true;

    uint256 immutable price = 100000000000000000; //0.1 ETH

    uint256[] private _teamShares = [100];

    address[] private _team = [
        0x9530EcAaF1A01Ad6034e5aA6a36B06a6b8a103bf
    ];

    constructor()
        ERC721A("RichApesClub", "RAC", limitPerWallet, maxMintSupply)
        PaymentSplitter(_team, _teamShares) {
        _transferOwnership(_team[0]);
    }

    function enable() public onlyOwner {
        publicState = true;
    }

    function disable() public onlyOwner {
        publicState = false;
    }

    function mint(uint256 _amount) external payable {
        require(publicState, "mint disabled");
        require(_amount > 0, "zero amount");
        require(_amount <= limitPerWallet, "can't mint so much tokens");
        require(totalSupply() + _amount <= maxMintSupply, "max supply exceeded");
        require(msg.value >= price * _amount , "value sent is not correct");

        _safeMint(_msgSender(), _amount);
    }

    // new set baseURI method
    function setBaseURI(string calldata _tokenBaseURI) external onlyOwner {
        baseURI = _tokenBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // interaction with second contract

    address secondContractAddress = 0xcaEcBd8e215b53C1AcFe23D02697D7Ca16d8EA8f; // hardcoded, from constructor or set by method?

    function getSecondContractBalanceOf() external view returns (uint) {
        return ISecondContract(secondContractAddress).balanceOf(msg.sender);
    }
}
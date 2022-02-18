// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./ERC721A.sol";
import "./Ownable.sol";
import "./Counters.sol";

interface IExternalContract {
    function balanceOf(address owner) external view returns (uint256);
}

contract RichApesClub is ERC721A, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    uint256 immutable price = 77700000000000000; //0.0777 ETH

    uint256 public maxMintSupply = 4444;
    uint256 public limitPerWallet = 30;

    bool public publicState = true;

    string public baseURI;

    address public externalContractAddress;

    mapping(address => bool) public _claimed;

    constructor()
        ERC721A("RichApesClub", "RAC", limitPerWallet, maxMintSupply) {
        _transferOwnership(0x9530EcAaF1A01Ad6034e5aA6a36B06a6b8a103bf);
    }

    function enable() public onlyOwner {
        publicState = true;
    }

    function disable() public onlyOwner {
        publicState = false;
    }

    function setBaseURI(string calldata _tokenBaseURI) external onlyOwner {
        baseURI = _tokenBaseURI;
    }

    function setExternalContractAddress(address contractAddress) external onlyOwner {
        externalContractAddress = contractAddress;
    }

    function externalBalanceOf(address owner) public view returns (uint256) {
        return IExternalContract(externalContractAddress).balanceOf(owner);
    }

    function mint(uint256 _amount) external payable {
        require(publicState, "mint disabled");
        require(_amount > 0, "zero amount");
        require(_amount <= limitPerWallet, "can't mint so much tokens"); // this is per tx or overall? if overall we need to change to `_amount <= limitPerWallet - balanceOf(msg.sender)`
        require(totalSupply() + _amount <= maxMintSupply, "max supply exceeded");
        require(msg.value >= price * _amount , "value sent is not correct");

       _safeMint(_msgSender(), _amount);
    }

    function claim() external payable {
        // add bool claimState and require?
        require(externalBalanceOf(msg.sender) > 0, "nothing to claim");
        require(!_claimed[msg.sender], "already claimed");
        require(externalBalanceOf(msg.sender) <= limitPerWallet, "can't mint so much tokens"); // this is per tx or overall? if overall we need to change to `externalBalanceOf(msg.sender) <= limitPerWallet - balanceOf(msg.sender)`
        require(totalSupply() + externalBalanceOf(msg.sender) <= maxMintSupply, "max supply exceeded");

        _safeMint(_msgSender(), externalBalanceOf(msg.sender));

        _claimed[msg.sender] = true;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
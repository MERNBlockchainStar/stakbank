// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "./interfaces/IERC20.sol";
import "./libraries/Ownable.sol";
import "./libraries/SafeMath.sol";
import "./libraries/Whitelist.sol";

contract StakBank is Whitelist {
    using SafeMath for uint256;
    using SafeMath for uint64;

    bool public active;
    uint256 public startTime;
    uint256 public cutoffTime;
    IERC20 internal immutable stak;

    enum poolNames {BRONZE, SILVER, GOLD}

    struct pool {
        uint256 maturityAPY;
        uint64 daysToMaturity;
        uint64 earlyWithdrawalAPY;
        uint64 daysToEarlyWithdrawal;
        uint256 maxPoolCapacity;
        uint256 rewardSupply;
        uint256 stakingFunds;
        uint256 userFunds;
        uint256 totalDeposited;
    }

    mapping(poolNames => pool) public pools;

    struct userDeposit {
        poolNames pool;
        uint256 amount;
        uint256 depositTime;
    }
    mapping(address => userDeposit[]) private userDeposits;

    uint256 public constant totalRewardSupply = (37808219 * 1 ether) / 100;
    uint256 public constant minStakingAmount = 2000 * 1 ether;

    constructor(IERC20 StakContract) public {
        stak = StakContract;

        pools[poolNames.BRONZE] = pool({
            maturityAPY: 20,
            daysToMaturity: 60,
            earlyWithdrawalAPY: 8,
            daysToEarlyWithdrawal: 30,
            maxPoolCapacity: 500000 * 1 ether,
            rewardSupply: (1643836 * 1 ether) / 100,
            stakingFunds: 0,
            userFunds: 0,
            totalDeposited: 0
        });

        pools[poolNames.SILVER] = pool({
            maturityAPY: 35,
            daysToMaturity: 120,
            earlyWithdrawalAPY: 14,
            daysToEarlyWithdrawal: 60,
            maxPoolCapacity: 1000000 * 1 ether,
            rewardSupply: (11506849 * 1 ether) / 100,
            stakingFunds: 0,
            userFunds: 0,
            totalDeposited: 0
        });

        pools[poolNames.GOLD] = pool({
            maturityAPY: 50,
            daysToMaturity: 180,
            earlyWithdrawalAPY: 20,
            daysToEarlyWithdrawal: 100,
            maxPoolCapacity: 1000000 * 1 ether,
            rewardSupply: (24657534 * 1 ether) / 100,
            stakingFunds: 0,
            userFunds: 0,
            totalDeposited: 0
        });
    }

    function deposit(uint256 depositAmount, poolNames _pool)
        external
        inWhitelist(msg.sender)
    {
        require(active == true, "Staking has not begun yet");
        require(
            stak.balanceOf(msg.sender) >= depositAmount,
            "Not enough STAK tokens"
        );
        require(
            stak.allowance(msg.sender, address(this)) >= depositAmount,
            "Check the STAK allowance"
        );
        require(depositAmount >= minStakingAmount, "depositAmount too low");
        require(
            pools[_pool].totalDeposited < pools[_pool].maxPoolCapacity,
            "Contract staking capacity exceeded"
        );
        require(
            block.timestamp < cutoffTime,
            "Contract staking deposit time period over"
        );
        pools[_pool].totalDeposited = pools[_pool].totalDeposited.add(
            depositAmount
        );
        pools[_pool].userFunds = pools[_pool].userFunds.add(depositAmount);
        userDeposits[msg.sender].push(
            userDeposit({
                pool: _pool,
                amount: depositAmount,
                depositTime: block.timestamp
            })
        );
        stak.transferFrom(msg.sender, address(this), depositAmount);
    }

    event Withdraw(
        poolNames pool,
        address userAddress,
        uint256 principal,
        uint256 yield,
        uint256 userFundsRemaining,
        uint256 stakingFundsRemaining
    );

    function withdraw(poolNames _pool) public inWhitelist(msg.sender) {
        require(active == true, "Staking has not begun yet");
        uint256 withdrawalAmount = getUserDepositTotal(msg.sender, _pool);
        require(withdrawalAmount > 0, "Nothing to withdraw");

        uint256 userYield = getUserYield(msg.sender, _pool);
        pools[_pool].userFunds = pools[_pool].userFunds.sub(withdrawalAmount);
        pools[_pool].stakingFunds = pools[_pool].stakingFunds.sub(userYield);
        for (uint256 i = 0; i < userDeposits[msg.sender].length; i++) {
            if (userDeposits[msg.sender][i].pool == _pool) {
                delete userDeposits[msg.sender][i];
            }
        }
        uint256 totalToTransfer = withdrawalAmount.add(userYield);
        stak.transfer(msg.sender, totalToTransfer);
        emit Withdraw(
            _pool,
            msg.sender,
            withdrawalAmount,
            userYield,
            pools[_pool].userFunds,
            pools[_pool].stakingFunds
        );
    }

    event StakingBegins(uint256 timestamp, uint256 stakingFunds);

    function beginStaking() external onlyOwner {
        require(
            stak.balanceOf(address(this)) == totalRewardSupply,
            "Not enough staking rewards"
        );
        active = true;
        startTime = block.timestamp;
        cutoffTime = startTime.add(10 days);
        pools[poolNames.BRONZE].stakingFunds = pools[poolNames.BRONZE]
            .rewardSupply;
        pools[poolNames.SILVER].stakingFunds = pools[poolNames.SILVER]
            .rewardSupply;
        pools[poolNames.GOLD].stakingFunds = pools[poolNames.GOLD].rewardSupply;
        emit StakingBegins(startTime, totalRewardSupply);
    }

    function getYieldMultiplier(uint256 daysStaked, poolNames _pool)
        public
        view
        returns (uint256)
    {
        if (daysStaked >= pools[_pool].daysToMaturity)
            return pools[_pool].maturityAPY;
        if (daysStaked >= pools[_pool].daysToEarlyWithdrawal)
            return pools[_pool].earlyWithdrawalAPY;
        return 0;
    }

    function getUserDepositTotal(address userAddress, poolNames _pool)
        public
        view
        returns (uint256)
    {
        uint256 totalDeposit;
        for (uint256 i = 0; i < userDeposits[userAddress].length; i++) {
            if (userDeposits[userAddress][i].pool == _pool) {
                totalDeposit = totalDeposit.add(
                    userDeposits[userAddress][i].amount
                );
            }
        }
        return totalDeposit;
    }

    function getUserYield(address userAddress, poolNames _pool)
        public
        view
        returns (uint256)
    {
        uint256 totalYield;
        for (uint256 i = 0; i < userDeposits[userAddress].length; i++) {
            if (userDeposits[userAddress][i].pool == _pool) {
                uint256 daysStaked =
                    (block.timestamp -
                        userDeposits[userAddress][i].depositTime) / 1 days;
                uint256 yieldMultiplier = getYieldMultiplier(daysStaked, _pool);
                uint64 daysMultiplier = getNDays(daysStaked, _pool);
                totalYield = totalYield.add(
                    (userDeposits[userAddress][i].amount *
                        1 ether *
                        yieldMultiplier *
                        daysMultiplier) / (1 ether * 100 * 365)
                );
            }
        }
        return totalYield;
    }

    function getNDays(uint256 daysStaked, poolNames _pool)
        public
        view
        returns (uint64)
    {
        if (daysStaked >= pools[_pool].daysToMaturity)
            return pools[_pool].daysToMaturity;
        if (daysStaked >= pools[_pool].daysToEarlyWithdrawal)
            return pools[_pool].daysToEarlyWithdrawal;
        return 0;
    }

    function getUserDeposits(address userAddress)
        external
        view
        returns (userDeposit[] memory)
    {
        return userDeposits[userAddress];
    }

    function getUserFunds(poolNames _pool) external view returns (uint256) {
        return pools[_pool].userFunds;
    }

    function getStakingFunds(poolNames _pool) external view returns (uint256) {
        return pools[_pool].stakingFunds;
    }
}
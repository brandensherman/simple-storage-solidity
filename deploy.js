const ethers = require('ethers')
const fs = require('fs')
require('dotenv').config()

async function main() {
  // connect to local ganache blockchain environment (http address) using ethers
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

  // connect to wallet in ganache (private key) using ethers
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

  // retrieve abi and bin files from compile contract
  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8')
  const binary = fs.readFileSync(
    './SimpleStorage_sol_SimpleStorage.bin',
    'utf8'
  )

  // contract factory - used to deploy contracts
  // abi -> makes sure code knows how to interact with the contract
  // binary -> compiled code
  // wallet -> private key to sign when deploying the contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log('Deploying, plesae wait...')
  const contract = await contractFactory.deploy()

  // Wait 1 block confirmation to make sure the contract was deployed
  await contract.deployTransaction.wait(1)

  // created when the transaction is intially deployed
  // console.log(
  //   'DEPLOYMENT TRANSACTION (transaction response):',
  //   contract.deployTransaction
  // )

  // created upon block confirmation when the transaciton is finished
  // console.log('DEPLOYMENT RECEIPT:', transactionReceipt)

  // return favorite number
  const currentFavoriteNumber = await contract.retrieve()
  console.log('Current Favorite Number:', currentFavoriteNumber.toString())

  const transactionResponse = await contract.store('7')
  await transactionResponse.wait(1)
  const updatedFavoriteNumber = await contract.retrieve()
  console.log('Updated Favorite Number:', updatedFavoriteNumber.toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

import { BasedAppsSDK, chains } from "@ssv-labs/bapps-sdk";
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// Setup viem clients
const chain = chains.holesky // or chains.holesky
const transport = http()

const publicClient = createPublicClient({
  chain,
  transport,
})

const account = privateKeyToAccount('')
const walletClient = createWalletClient({
  account,
  chain,
  transport,
})

const sdk = new BasedAppsSDK({
   beaconchainUrl: "https://beacon-holesky.ethp.io",
   publicClient,
   walletClient,
 })

async function main(): Promise<void> { 

  const tokenCoefficient: Array<{ token: `0x${string}`; coefficient: number }> = [
    {
      token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034" as `0x${string}`,
      coefficient: 5,
    },
  ] as const;
  const validatorCoefficient = 1;

  const strategyTokenWeights = await sdk.api.getParticipantWeights({
    bAppId: "0x4f0f5ab30f62b62ed0466b697f0ec7b30560ee48",
  });

  console.log(strategyTokenWeights);

  const weightCalculationOptions =    {
      coefficients: tokenCoefficient,
      validatorCoefficient: validatorCoefficient,
  }

  const arithmeticStrategyWeights = sdk.utils.calcArithmeticStrategyWeights(strategyTokenWeights, weightCalculationOptions);
  console.info(JSON.stringify(arithmeticStrategyWeights));

  /*
  const receipt = await sdk.core.contracts.bapp.write.createStrategy({
    args: {
        fee: 10000,
        metadataURI: "https://example.com/metadata",
    },
}).then((tx) => tx.wait())
console.log(receipt)
*/
}

main();


/// WEIGHT STUFF 
  /*
    const tokenCoefficient: Array<{ token: `0x${string}`; coefficient: number }> = [
      {
        token: "0x3f1c547b21f65e10480de3ad8e19faac46c95034" as `0x${string}`,
        coefficient: 5,
      },
    ] as const;
    const validatorCoefficient = 1;
  
    const strategyTokenWeights = await sdk.api.getParticipantWeights({
      bAppId: "0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214",
    });

    console.log(strategyTokenWeights);

    const weightCalculationOptions =    {
        coefficients: tokenCoefficient,
        validatorCoefficient: validatorCoefficient,
    }
  
    const arithmeticStrategyWeights = sdk.utils.calcArithmeticStrategyWeights(strategyTokenWeights, weightCalculationOptions);
    const geometricStrategyWeights = sdk.utils.calcGeometricStrategyWeights(strategyTokenWeights, weightCalculationOptions);
    const harmonicStrategyWeights = sdk.utils.calcHarmonicStrategyWeights(strategyTokenWeights, weightCalculationOptions);
  
    console.info(JSON.stringify(arithmeticStrategyWeights));
    console.info(JSON.stringify(geometricStrategyWeights));
    console.info(JSON.stringify(harmonicStrategyWeights));
    */
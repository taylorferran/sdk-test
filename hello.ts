import { BasedAppsSDK, chains } from "@ssv-labs/bapps-sdk";
import * as dotenv from "dotenv";

const sdk = new BasedAppsSDK({
  bamGraphUrl: 'https://api.studio.thegraph.com/query/71118/based-applications-ssv-holesky/version/latest',
  dvtGraphUrl: 'https://api.studio.thegraph.com/query/71118/ssv-network-holesky/version/latest',
  beaconchainUrl: 'http://57.129.73.156:31101',
});

dotenv.config();

async function main(): Promise<void> {


  // usage of based apps api
  const weights = await sdk.api.getParticipantWeights({
    bAppId: "0x384c9f3e8d640b0bfee18e5ae70a0257acd8e214",
  });

  sdk.api.getParticipantWeights

  console.log("--------------------------------");
  console.log(JSON.stringify(weights, null, 2));  
  console.log("--------------------------------");

/*
    const obligatedBalances = await sdk.api.getObligatedBalances({
      bAppId: "0x64714cf5db177398729e37627be0fc08f43b17a6",
    });

    console.log("--------------------------------");
    console.log(obligatedBalances);
    console.log("--------------------------------");
*/
}

main();
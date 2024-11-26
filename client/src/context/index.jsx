import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useConnect, metamaskWallet , useContractWrite, useDisconnect, useWallet  } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
/* import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk'; */

const StateContext = createContext();

const metamaskConfig = metamaskWallet();

export const StateContextProvider = ({ children }) => {
  // Contract address
  const { contract } = useContract('0x2DAf81C33294121312C93EE9758043A84f5f9BD7');
  // useContractWrite Hook for Smart Contracts with Transactions, Returning mutateAsync Renamed to createCampaign
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');


  // Obtiene la direccion de la wallet que este conectada
  const address = useAddress();
  // Hook para conectar/desconectar wallet
  const connect = useConnect();
  const disconnect = useDisconnect()
  // Funcion to connect wallet
  const connectWallet = async() => {
    const wallet = await connect(metamaskConfig);
  }

  const walletInstance = useWallet()

  // Funcion for publishing campaign
  const publishCampaign = async (form) => {
    try {
      // Data to be sent
      const data = await createCampaign({
				args: [
					address,
					form.title,
					form.description,
					form.target,
					new Date(form.deadline).getTime(),
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));
    console.log(parsedCampaings)
    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        createCampaign: publishCampaign,
        connectWallet,
        connect,
        disconnect,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        walletInstance
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
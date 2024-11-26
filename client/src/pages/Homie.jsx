import React, {useState, useEffect} from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from '../components';
const Homie = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const {address, contract, getCampaigns} = useStateContext();

  const fetchCampaigns = async()=>{
    setIsLoading(true)
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false)
  }

  useEffect(() => {
    if (contract) fetchCampaigns();

  }, [address, contract])
  
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoadng={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Homie
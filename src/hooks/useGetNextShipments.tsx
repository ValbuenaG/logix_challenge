import { useEffect, useState } from "react"

import moment from "moment"
import { fetchShipments, FetchShipmentsResult, SuccessResult } from "../data/fetch-shipments"

type LoadingResult = {
    status: 'LOADING'
}
const INITIAL_RESULT: LoadingResult = {
    status: 'LOADING'
}

export const useGetNextShipments = () => {
    const [fetchShipmentsResult, setFetchShipmentsResult] = useState<FetchShipmentsResult | LoadingResult>(INITIAL_RESULT)
    useEffect(() => {
        fetchShipments().then(result => setFetchShipmentsResult(result.status === "SUCCESS" ? getNextWeekShipments(result) : result))
    }, [])

    // this function filter the shipments to get only the ones that arrives on the next seven days
    const getNextWeekShipments = (result: SuccessResult) => {
        const { shipments } = result
    
    
        const startNextWeek = moment().valueOf()
        const endNextWeek = moment().add(7, 'days').valueOf()
        const nextShipments = shipments.filter( 
            s => Date.parse(s.estimatedArrival) >= startNextWeek && Date.parse(s.estimatedArrival) <= endNextWeek
        )
    
        return {
            ...result,
            shipments: nextShipments
        }
    
    }

    return {
        fetchShipmentsResult
    }
}

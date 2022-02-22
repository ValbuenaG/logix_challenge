import { useEffect, useState } from "react"

import moment from "moment"
import { fetchShipments, FetchShipmentsResult, SuccessResult } from "../data/fetch-shipments"

type LoadingResult = {
    status: 'LOADING'
}
const INITIAL_RESULT: LoadingResult = {
    status: 'LOADING'
}
const START_DATE_INCREMENT = 1
const END_DATE_INCREMENT = 8

export const useGetNextShipments = () => {
    const [fetchShipmentsResult, setFetchShipmentsResult] = useState<FetchShipmentsResult | LoadingResult>(INITIAL_RESULT)
    useEffect(() => {
        fetchShipments().then(result => setFetchShipmentsResult(result.status === "SUCCESS" ? getNextWeekShipments(result) : result))
    }, [])

    // this function filter the shipments to get only the ones that arrives on the next seven days counting from today
    const getNextWeekShipments = (result: SuccessResult) => {
        const { shipments } = result
    
        // startDate and endDate is the interval of the next 7 days
        const startDate = moment().add(START_DATE_INCREMENT, 'days').format('MM/DD/YYYY')
        const endDate = moment().add(END_DATE_INCREMENT, 'days').format('MM/DD/YYYY')
        const nextShipments = shipments.filter( 
            // if the estimatedArrival date on unix is between those dates should arrive in the next seven days
            s => Date.parse(s.estimatedArrival) >= Date.parse(startDate) && Date.parse(s.estimatedArrival) <= Date.parse(endDate)
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

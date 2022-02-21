import {Shipment, GroupedShipments} from "../data/Shipment"

export const groupBy = (data: Shipment[]) => data.reduce((acc: GroupedShipments, {estimatedArrival, ...rest}) => {
    if(!acc.hasOwnProperty(estimatedArrival)) acc[estimatedArrival] = []

    acc[estimatedArrival].push({...rest, estimatedArrival});
    return acc;
  }, {});


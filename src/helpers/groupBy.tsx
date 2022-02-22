import {Shipment, GroupedShipments} from "../data/Shipment"

// function to group shipments by estimatedArrival date. that way is easier to display it
export const groupBy = (data: Shipment[]) => data.reduce((acc: GroupedShipments, {estimatedArrival, ...rest}) => {
    if(!acc.hasOwnProperty(estimatedArrival)) acc[estimatedArrival] = []

    acc[estimatedArrival].push({...rest, estimatedArrival});
    return acc;
  }, {});


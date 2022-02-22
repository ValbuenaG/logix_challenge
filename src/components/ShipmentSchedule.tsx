import { useEffect, useState } from "react"
import { GroupedShipments } from "../data/Shipment"
import { Box, List, Typography, makeStyles, Divider } from "@material-ui/core"
import moment from 'moment'

const useStyles = makeStyles({
    BoxContainer: {
        width: '100%',
        maxWidth: 600,
        paddingLeft: 16,
        paddingRight: 16,
        '@media (max-width:600px)': {
            width: 'calc(100% - 16px)',
        }
    },
    ListTitle: {
        fontWeight: 'bold'
    },
    textSmall: {
        fontSize: '.8rem',
        fontWeight: 'bold'
    },
    TextDescription: {
        fontWeight: 400,
        fontSize: '1rem'
    },
    textStatus: {
        fontWeight: 200,
        fontSize: '.7rem',
        color: '#778899'
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
    
})

export const ShipmentSchedule = (props: { shipments: GroupedShipments, }) => {
    const classes = useStyles()
    const [ sortedShipments, setSortedShipments ] = useState<Array<string>>()
    const tomorrow = moment().add(1, 'days').format('MM/DD/YYYY')
    const { shipments } = props

    useEffect(() => {
        // here i sort the arrival dates
        const sortedShipments = Object.keys(shipments).sort(function(a, b) {
            return +new Date(a) - +new Date(b);
          });

        setSortedShipments(sortedShipments)
    }, [shipments])

    return (
        <Box className={classes.BoxContainer}>
            {sortedShipments?.map((arrival, key) => (
                <List key={key}>
                    <Typography variant="h6">{Date.parse(arrival) === Date.parse(tomorrow) ? 'Arriving Tomorrow' : arrival}</Typography>
                    {shipments[arrival].map((shipment) => (
                        <Box key={shipment.id} sx={{ py: 2 }}>
                            <Box className={classes.flexContainer}>
                                <Box className={classes.flexContainer} sx={{ paddingRight: 16, minWidth: 62 }}>
                                    <Typography className={classes.textSmall} >{shipment.houseBillNumber}</Typography>
                                </Box>
                                <Box sx={{ paddingLeft: 16, paddingBottom: 4}}>
                                    <Typography className={classes.TextDescription}>{shipment.client}</Typography>
                                    <Typography className={classes.textStatus}>{shipment.status}</Typography>
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    ))}
                </List>
            ))}
        </Box>
    )
}
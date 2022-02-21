import { GroupedShipments } from "../data/Shipment"
import { Box, List, Typography, makeStyles, Divider } from "@material-ui/core"

const useStyles = makeStyles({
    BoxContainer: {
        width: '100%',
        maxWidth: 600,
        paddingLeft: 16,
        paddingRight: 16
    },
    ListTitle: {
        fontWeight: 'bold'
    },
    textSmall: {
        fontWeight: 100,
        fontSize: '.9rem'
    },
    TextDescription: {
        fontWeight: 400,
        fontSize: '1rem'
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
    
})

export const ShipmentSchedule = (props: { shipments: GroupedShipments, }) => {
    const classes = useStyles()
    const { shipments } = props

    const sortedShipments = Object.keys(shipments).sort(function(a, b) {
        return +new Date(a) - +new Date(b);
      });

    return (
        <Box className={classes.BoxContainer}>
            {sortedShipments.map((arrival, key) => (
                <List key={key}>
                    <Typography variant="h6">{arrival}</Typography>
                    {shipments[arrival].map((shipment) => (
                        <Box key={shipment.id} sx={{ paddingBottom: 4, paddingTop: 2 }}>
                            <Box className={classes.flexContainer}>
                                <Box className={classes.flexContainer} sx={{ paddingRight: 16 }}>
                                    <Typography className={classes.textSmall} >{shipment.houseBillNumber}</Typography>
                                </Box>
                                <Box sx={{ paddingLeft: 16, paddingBottom: 4}}>
                                    <Typography className={classes.TextDescription}>{shipment.client}</Typography>
                                    <Typography className={classes.textSmall}>{shipment.destination}</Typography>
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
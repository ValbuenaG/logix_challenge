import { ReactElement } from "react"
import { Box, makeStyles, useTheme } from "@material-ui/core"
import Loader from "react-loader-spinner"
import { useGetNextShipments } from "../hooks/useGetNextShipments"
import { groupBy } from "../helpers/groupBy"
import { ShipmentSchedule } from "../components/ShipmentSchedule"

const useStyles = makeStyles({
    loader: {
        margin: 'auto',
        width: 'fit-content',
        marginTop: 200
    }
})

export const DashboardPage: React.FC = () => {
    const classes = useStyles()
    const theme = useTheme()

    const { fetchShipmentsResult } = useGetNextShipments()

    let component: ReactElement
    switch (fetchShipmentsResult.status) {
        case 'SUCCESS':
            component = <ShipmentSchedule shipments={groupBy(fetchShipmentsResult.shipments)}/>
            break;
        case 'LOADING':
            component = <Box className={classes.loader}>
                <Loader type="Grid" color={theme.palette.primary.main} />
            </Box >
            break
        case 'ERROR':
            component = <p>Error</p>
            break
    }

    return component
}
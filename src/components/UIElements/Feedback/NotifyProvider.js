import { Fragment } from 'react'
import { SnackbarProvider } from 'notistack'

import styles from './NotifyProvider.module.css'

const NotifyProvider = (props) => {
    return (
        <Fragment>
            <SnackbarProvider
                preventDuplicate
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                classes={{
                    variantSuccess: styles.success,
                    variantError: styles.error,
                    variantWarning: styles.warning,
                    variantInfo: styles.info,
                }}
            >
                {props.children}
            </SnackbarProvider>
        </Fragment>
    )
}

export default NotifyProvider

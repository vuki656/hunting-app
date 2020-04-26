import * as actionTypes from './types'

export const setScannedCode = (scannedCode) => {
    return {
        type: actionTypes.SET_SCANNED_CODE,
        payload: {
            scannedCode,
        },
    }
}

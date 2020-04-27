import * as actionTypes from './types'

export const setScannedCode = (scannedCode) => {
    return {
        type: actionTypes.SET_SCANNED_CODE,
        payload: {
            scannedCode,
        },
    }
}

export const setSelectedMeat = (selectedMeat) => {
    return {
        type: actionTypes.SET_SELECTED_MEAT,
        payload: {
            selectedMeat,
        },
    }
}

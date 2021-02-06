import * as actionTypes from './types'

export const setScannedCode = (scannedCode) => {
    return {
        payload: {
            scannedCode: scannedCode,
        },
        type: actionTypes.SET_SCANNED_CODE,
    }
}

export const setSelectedMeat = (selectedMeat) => {
    return {
        payload: {
            selectedMeat: selectedMeat,
        },
        type: actionTypes.SET_SELECTED_MEAT,
    }
}

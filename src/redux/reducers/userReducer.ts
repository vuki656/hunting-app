import * as actionTypes from '../actions/types'

const initialState = {
    scannedCode: '',
    selectedMeat: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SCANNED_CODE:
            return {
                ...state,
                scannedCode: action.payload.scannedCode,
            }
        case actionTypes.SET_SELECTED_MEAT:
            return {
                ...state,
                selectedMeat: action.payload.selectedMeat,
            }
        default:
            return state
    }
}

export default userReducer

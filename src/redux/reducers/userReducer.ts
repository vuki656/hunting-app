import * as actionTypes from '../actions/types'

const initialState = {
    scannedCode: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SCANNED_CODE:
            return {
                ...state,
                scannedCode: action.payload.scannedCode,
            }
        default:
            return state
    }
}

export default userReducer

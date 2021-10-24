import { CREATE_PIN, FETCH_ALL_PINS} from '../constants/actionTypes';

export default (state = { isLoading: true, pins: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_ALL_PINS:
            return {
                ...state,
                pins: action.payload.data,
            };
        case CREATE_PIN:
            const newData = action.payload;

            return {
                ...state,
                pins: [...state.pins, newData] };
        default:
            return state;
    }
};


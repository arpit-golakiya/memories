import {CREATE_PIN,END_LOADING, FETCH_ALL_PINS,START_LOADING} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPins = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPins();
        dispatch({ type: FETCH_ALL_PINS, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createPin = (pin) => async (dispatch) => {
        try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPin(pin);

        dispatch({ type: CREATE_PIN, payload: data });

        // history.push(`/posts/${data._id}`);
    } catch (error) {
        console.log(error);
    }
};

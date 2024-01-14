import { addImageConstant } from "../../constant/userMedicine/addImage"
const initialState = {
    loading: false,
    data: null,
    error: null
}

export const addImageReducer = (state = initialState, action) => {
    console.log(action.type, "action")

    switch (action.type) {
        case addImageConstant.addImageLoad:
            return { ...state, loading: true, data: null, error: null }
        case addImageConstant.addImageSuccess:
            console.log(action.payload,"appppppppppppppppp")
            return {
                ...state, loading: false, data: action.payload, error: null
            }
        case addImageConstant.addImageError:
            return {...state, loading: false, data: null, error: action.payload}


        default:
            console.log("default")
            return state;
    }
}
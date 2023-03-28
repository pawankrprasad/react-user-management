const OPEN_MODEL = "OPEN_MODEL";
const CLOSE_MODEL = "CLOSE_MODEL";
const INPUT_CHANAGE = "INPUT_CHANAGE";
const CHECKBOX_CHANGE = "CHECKBOX_CHANGE";
const FORM_SUBMIT = "FORM_SUBMIT"


export const modelOpen = () => ({ type: OPEN_MODEL});
export const modelClose = () => ({ type: CLOSE_MODEL});
export const inputChange = (payload) => ({ type: INPUT_CHANAGE, payload });
export const checkBoxChange = (payload) => ({ type: CHECKBOX_CHANGE, payload });
export const formSubmit = (payload) => ({ type: FORM_SUBMIT });

export const initialState = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    status: false,
    showModel: false
}


export const addUserReducer = (state, action)=>{

    const {type, payload} = action;

    switch(type){
        case OPEN_MODEL:
            return  {
                ...state,
                showModel:true
            }
        case CLOSE_MODEL:
            return  {
                ...state,
                showModel:false
            }
        case INPUT_CHANAGE:
            return  {
                ...state,
                [payload.field]:payload.value
            }
        case CHECKBOX_CHANGE:
            return  {
                ...state,
                [payload.field]: !state[payload.field]
            }
        case FORM_SUBMIT:
            return  {
                ...initialState
             }
        default:
            return {
                ...state
            }
    }
}

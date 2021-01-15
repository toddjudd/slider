const pickStateRecuder = (state, action) => {
  switch (action.type) {
    case 'LOAD_TASK':
      return {
        ...state,
        ...action.task,
        actualQuantity: action.task.expectedQuantity,
        actualSourceLocation: action.task.expectedSourceLocation,
        actualSourceLP: '', //action.task.expectedSourceLicensePlate,
      };
    case 'FORM_CHANGE':
      return { ...state, ...action.change };
    case 'SHOW_LOC_MODAL':
      return { ...state, showLocSearch: true };
    case 'SHOW_LP_MODAL':
      return { ...state, showLpSearch: true };
    case 'HIDE_LOC_MODAL':
      return { ...state, showLocSearch: false };
    case 'HIDE_LP_MODAL':
      return { ...state, showLpSearch: false };
    case 'RESET':
      return {
        ...state,
        submitting: false,
        fromIsValid: null,
        actualQuantity: state.expectedQuantity,
        actualSourceLocation: state.expectedSourceLocation,
        actualSourceLP: '', //state.expectedSourceLicensePlate,
      };
    case 'FORM_SUBMIT': {
      // validateForm()
      let vallidation = { fromIsValid: true, submitting: true };
      if (!/^\d+$/.test(action.form['quantity'].value)) {
        vallidation.actualQuantityIsValid = false;
        vallidation.fromIsValid = false;
      }
      return { ...state, ...vallidation };
    }
    default: {
    }
  }
};
const initialState = {
  taskId: null,
  materialLookup: null,
  materialDescription: null,
  expectedQuantity: null,
  actualQuantity: '',
  expectedSourceLocation: null,
  actualSourceLocation: '',
  actualSourceLP: '',
  project: null,
  owner: null,
  waveId: null,
  shippingContainerId: null,
  shipmentId: null,
  orderId: null,
  pickslipId: null,
  created: null,
  fromIsValid: null,
  actualQuantityIsValid: true,
  actualSourceLocationisValid: true,
  showLocSearch: false,
  actualSourceLPIsValid: null,
  showLpSearch: false,
  submitting: false,
};

export { initialState };
export default pickStateRecuder;

import * as _ from 'lodash';
import {shoppingList} from './initState';

/* eslint-disable no-alert */

// ------------------------------------
// Constants
// ------------------------------------
export const ADDTOCARD = 'ADDTOCARD';
export const REMOVEFROMCARD = 'REMOVEFROMCARD';
const SETDEVLIST = 'SETDEVLIST';
const SETPRICE = 'SETPRICE';
const USECOUPON = 'USECOUPON';
const SETTOKEN = 'SETTOKEN';
const SETSTATE = 'SETSTATE';
export const RESETSTATE = 'RESETSTATE';
export const CHANGEPAGE = 'CHANGEPAGE';
export const LOADINGSTATE = 'LOADINGSTATE';
export const SKIPCHANGE = 'SKIPCHANGE';
export const UPDATENAME = 'UPDATENAME';
export const ADDHISTORYITEMORG = 'ADDHISTORYITEMORG';
export const ADDHISTORYITEMUSER = 'ADDHISTORYITEMUSER';
export const CHANGESTATEORDER = 'CHANGESTATEORDER';
export const RESETCARD = 'RESETCARD';

// ------------------------------------
// Actions
// ------------------------------------

export function addToCard(e) {
  if (e.appAdded.totalSum) {
    return {
      type: ADDTOCARD,
      item: e,
    };
  } else {
    return {
      type: SKIPCHANGE,
    };
  }
}

export function resetCart() {
  return {
    type: RESETCARD,
  };
}

export function changeStage(stage) {
  return {
    type: CHANGESTATEORDER,
    stage,
  };
}

export function removeFromCard(e) {
  return {
    type: REMOVEFROMCARD,
    item: e,
  };
}

export function addToDevList(e) {
  return {
    type: SETDEVLIST,
    devs: e,
  };
}

export function addHistoryOrg(e) {
  return {
    type: ADDHISTORYITEMORG,
    item: e,
  };
}

export function addHistoryUser(e) {
  return {
    type: ADDHISTORYITEMUSER,
    item: e,
  };
}

export function calculatePrice(obj, e) {
  const value = parseInt(e.target.value, 10);
  return {
    type: SETPRICE,
    value: value > -1 ? value : 0,
    item: obj,
  };
}

export function setLoadingState(loading) {
  return {
    type: LOADINGSTATE,
    loading,
  };
}

export function addDevFromName(dev) {
  if (!dev) {
    alert('No input');
    return {
      type: SKIPCHANGE,
    };
  }

  return async (dispatch) => {
    dispatch(setLoadingState(true));
    const out = await fetch(`/api/getdev?dev=${dev}`);
    dispatch(setLoadingState(false));
    switch (out.status) {
      case 200: {
        const outJson = await out.json();
        dispatch(addToDevList(outJson));
      }
      break;
      case 404:
        alert(`No such developer: ${dev}`);
        return;
      default:
        alert(`An error ocurred on the server: ${out.status}`);
    }
  };
}

export function setToken(token) {
  return {
    type: SETTOKEN,
    token,
  };
}

export function loadState(state) {
  return {
    type: SETSTATE,
    state,
  };
}

export function changePage(page) {
  return {
    type: CHANGEPAGE,
    page,
  };
}

export function loadStateFromToken(token) {
  return async (dispatch) => {
    const out = await fetch(`/api/getorder?token=${token}`);
    const outJson = await out.json();
    dispatch(loadState(outJson));
  };
}

export function sendOrder(email) {
  return async (dispatch, getState) => {
    const state = {
      appState: {...getState().shoppinglist, timestamp: new Date().toJSON()},
      email,
    };

    const request = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(state),
    };

    const out = await fetch('/api/postorder', request);
    const outJson = await out.json();
    dispatch(setToken(outJson.token));
  };
}

export function addDevFromOrg(org) {
  if (!org) {
    alert('No input');
    return {
      type: SKIPCHANGE,
    };
  }

  return async (dispatch) => {
    dispatch(setLoadingState(true));
    const out = await fetch(`/api/getmembers?org=${org}`);
    dispatch(setLoadingState(false));
    switch (out.status) {
      case 200: {
        const outJson = await out.json();
        dispatch(addToDevList(outJson));
      }
      break;
      case 404:
        alert(`No such organisation: ${org}`);
        return;
      default:
        alert(`An error ocurred on the server: ${out.status}`);
    }
  };
}

export function endOrdering() {
  return {
    type: RESETSTATE,
  };
}

function calculateSum(state) {
  const mapped = state.shoppingcard.map(e => _.get(e, 'appAdded.totalSum'));
  const sumOriginal = _.sum(mapped);
  let sum = 0;
  if (state.discount) {
    const sumCoupon = (1 - (state.discount / 100)) * sumOriginal;
    sum = sumCoupon;
  } else {
    sum = sumOriginal;
  }
  return {
    sumOriginal,
    sum: Math.round(sum),
  };
}


export function setName(name) {
  return {
    type: UPDATENAME,
    name,
  };
}

export function componentOnline(name) {
  return {
    type: SKIPCHANGE,
    name,
  };
}

export function useCoupon(event) {
  const value = event.target.value;
  let discount;
  switch (value) {
    case 'SHIPIT':
      discount = 10;
      break;
    case 'GETIDONE':
      discount = 40;
      break;
    default:
      discount = 0;
  }
  return {
    type: USECOUPON,
    value,
    discount,
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADDHISTORYITEMUSER]: (state, action) => {
    const searchHistoryUser = _.uniq(state.searchHistoryUser.concat(action.item));
    const lastUserSearch = searchHistoryUser[searchHistoryUser.length - 1];
    return ({...state, searchHistoryUser, lastUserSearch});
  },
  [ADDHISTORYITEMORG]: (state, action) => {
    const searchHistoryOrg =  _.uniq(state.searchHistoryOrg.concat(action.item))
    const lastOrgSearch = searchHistoryOrg[searchHistoryOrg.length - 1];
    return ({...state, searchHistoryOrg,lastOrgSearch});
  },
  [LOADINGSTATE]: (state, action) => ({...state, loading: action.loading}),
  [ADDTOCARD]: (state, action) => {
    const ixAdd = _.findIndex(state.shoppingcard, e => e.login === action.item.login);
    const ixIsInCard = _.findIndex(state.developers, e => e.login === action.item.login);
    if (ixIsInCard === -1) {
      return state;
    }

    const developer = {...state.developers[ixIsInCard], isInCard: true};

    const developers = [
      ...state.developers.slice(0, ixIsInCard),
      developer,
      ...state.developers.slice(ixIsInCard + 1),
    ];

    const shoppingcard = state.shoppingcard.concat(developer);
    const preState = {
      ...state,
      shoppingcard,
      developers,
    };
    return ixAdd === -1 ?
      {...preState, ...calculateSum(preState)} :
      state;
  },
  [CHANGEPAGE]: (state, action) => {
    if (action.page < 0) {
      return state;
    }

    if (action.page > (state.pages - 1)) {
      return state;
    }

    const newState = {...state, currentPage: action.page};
    return newState;
  },
  [SETTOKEN]: (state, action) => {
    return {
      ...state,
      token: action.token,
    };
  },
  [CHANGESTATEORDER]: (state, action) => {
    return {...state, orderStage: action.stage};
  },
  [RESETCARD]: (state, action) => {
    return {...state, shoppingcard: [], developers: state.developers.map(e => ({...e, isInCard: false}))};
  },
  [SETPRICE]: (state, action) => {
    const ixIsInCard = _.findIndex(state.developers, e => e.login === action.item.login);
    const devOld = state.developers[ixIsInCard];
    const devNew = {
      ...devOld,
      appAdded: {
        ...devOld.appAdded,
        orderedHours: action.value,
        totalSum: action.value * devOld.appAdded.price,
      },
    };

    const developers = [
      ...state.developers.slice(0, ixIsInCard),
      devNew,
      ...state.developers.slice(ixIsInCard + 1),
    ];

    return {...state, developers};
  },
  [SETSTATE]: (state, action) => {
    return {
      ...state,
      ...action.state,
    };
  },
  [SKIPCHANGE]: (state) => {
    return state;
  },
  [USECOUPON]: (state, action) => {
    const preState =
    {...state, coupon: action.value,
      discount: action.discount};
    return {
      ...preState,
      ...calculateSum(preState),
    };
  },
  [UPDATENAME]: (state, {name}) => ({...state, name}),
  [RESETSTATE]: () => {
    return {...shoppingList};
  },
  [SETDEVLIST]: (state, action) => {
    const developers = _.uniqBy(state.developers.concat(action.devs), e => e.login);
    const pages = Math.ceil(developers.length / state.devsOnPage);
    return ({...state, developers, pages});
  },
  [REMOVEFROMCARD]: (state, action) => {
    const ixRemove = _.findIndex(state.shoppingcard, e => e.login === action.item.login);
    const shoppingcard = [
      ...state.shoppingcard.slice(0, ixRemove),
      ...state.shoppingcard.slice(ixRemove + 1),
    ];

    const ixIsInCard = _.findIndex(state.developers, e => e.login === action.item.login);
    const developers = [
      ...state.developers.slice(0, ixIsInCard),
      {...state.developers[ixIsInCard], isInCard: false},
      ...state.developers.slice(ixIsInCard + 1),
    ];

    const preState = {
      ...state,
      shoppingcard,
      developers,
    };
    return {
      ...preState,
      ...calculateSum(preState),
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = {name: 'Igor'}, action = {type: undefined}) {
  const fn = ACTION_HANDLERS[action.type];
  const newState = fn ? fn(state, action) : state;
  localStorage.redux = JSON.stringify(newState);
  return newState;
}

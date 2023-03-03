import { NOT_EKLE, NOT_SIL, NOT_BASLANGIC } from './actions';
import { nanoid } from "nanoid";

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};


function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri
  }
}


const reducer = (state = baslangicDegerleri, action) => {
  switch (action.type) {
    case NOT_EKLE: {
      const yeniNot = {
        id: nanoid(),
        date: Date(),
        body: Object.values(action.payload)
          .filter((v) => v !== "")
          .join("|"),
      };
      const newState = {
        ...state,
        notlar: [...state.notlar, yeniNot]
      }
      localStorageStateYaz(s10chLocalStorageKey, newState.notlar)
      return newState;
    }
    case NOT_SIL: {
      const newState = {
        ...state,
        notlar: state.notlar.filter(not => not.id !== action.payload)
      }
      localStorageStateYaz(s10chLocalStorageKey, newState.notlar)
      return newState;
    }
    case NOT_BASLANGIC: {
      const newState = {
        ...state,
        notlar: baslangicNotlariniGetir(s10chLocalStorageKey)
      }
      return newState;
    }
    default:
      return state;
  }
}

export default reducer;
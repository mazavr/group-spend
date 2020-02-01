import React, {useReducer} from 'react';
import BaseNavigation from "../containers/BaseNavigation";
import {globalReducer, globalState, init, globalContext} from "../store/globalReducer";
import Sessions from "../containers/Sessions";
import Users from "../containers/Users";
import viewNames from "../constants/viewNames";

function App() {
  const [store, dispatch] = useReducer(globalReducer, globalState, init);

  return (
    <globalContext.Provider value={[store, dispatch]}>
      <div className="v-list">
        <div className={'v-list__item'}>
          <BaseNavigation/>
        </div>
        <div className={`v-list__item ${store.view === viewNames.USERS ? '' : 'display--none'}`}>
          <Users/>
        </div>
        <div className={`v-list__item ${store.view === viewNames.SESSIONS ? '' : 'display--none'}`}>
          <Sessions/>
        </div>
      </div>
    </globalContext.Provider>
  )
}

export default App;

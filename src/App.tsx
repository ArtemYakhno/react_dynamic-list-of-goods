import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';

type Filter = 'all' | 'first5' | 'red';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [goods, setGoods] = useState<Good[]>([]);

  useEffect(() => {
    let loadFn: () => Promise<Good[]>;

    switch (filter) {
      case 'first5':
        loadFn = get5First;
        break;
      case 'red':
        loadFn = getRedGoods;
        break;
      default:
        loadFn = getAll;
    }

    loadFn().then(setGoods);
  }, [filter]);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button onClick={() => setFilter('all')}>Load all goods</button>
      <button onClick={() => setFilter('first5')}>Load 5 first goods</button>
      <button onClick={() => setFilter('red')}>Load red goods</button>

      <GoodsList goods={goods} />
    </div>
  );
};

import React from 'react';
import { StackNavigator } from 'react-navigation';

import { Home } from './src/Views/Home';
import { Scheduler } from './src/Views/Scheduler';
import { RoundRobin } from './src/Views/RoundRobin';
import { LeastTimetoGo } from './src/Views/LeastTimetoGo';

const MyRoutes = StackNavigator({
  HomeRT: {
    screen: Home
  },
  SchedulerRT: {
    screen: Scheduler
  },
  RoundRobinRT: {
    screen: RoundRobin
  },
  LeastTimetoGoRT: {
    screen: LeastTimetoGo
  }
},
  {
    initialRouteName: 'HomeRT'
  }
);

export default class App extends React.Component {
  render() {
    return (
      <MyRoutes />
    );
  }
}

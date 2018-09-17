import React from 'react';
import { StackNavigator } from 'react-navigation'

import { Home } from './src/Views/Home';
import { Scheduler } from './src/Views/Scheduler'

const MyRoutes = StackNavigator({
  HomeRT: {
    screen: Home
  },
  SchedulerRT: {
    screen: Scheduler
  },
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

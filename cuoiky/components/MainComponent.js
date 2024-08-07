// import React, { Component } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem  } from '@react-navigation/drawer';
// import { Icon, Image } from 'react-native-elements';



// import Home from './HomeComponent';
// import Vervo from './ServoComponent'
// function HomeNavigatorScreen() {
//   const HomeNavigator = createStackNavigator();
//   return (
//     <HomeNavigator.Navigator
//       initialRouteName='Home'
//       screenOptions={{
//         headerStyle: { backgroundColor: '#7cc' },
//         headerTintColor: '#fff',
//         headerTitleStyle: { color: '#fff' }
//       }}>
//        <HomeNavigator.Screen name='Home' component={Home}
//         options={({ navigation }) => ({
//           headerTitle: 'Home',
//           headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
//         })} />
//     </HomeNavigator.Navigator>
//   );
// }

// function VervoNavigatorScreen() {
//   const VervoNavigator = createStackNavigator();
//   return (
//     <VervoNavigator.Navigator initialRouteName='Vervo'
//       screenOptions={{
//         headerStyle: { backgroundColor: '#7cc' },
//         headerTintColor: '#fff',
//         headerTitleStyle: { color: '#fff' }
//       }}>
//       <VervoNavigator.Screen name='Vervo' component={Vervo}
//         options={({ navigation }) => ({
//           headerTitle: 'Vervo',
//           headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
//         })} />
//     </VervoNavigator.Navigator>
//   );
// }



// function MainNavigatorScreen() {
//   const MainNavigator = createDrawerNavigator();
//   return (
//     <MainNavigator.Navigator initialRouteName='HomeScreen' drawerContent={(props) => <CustomDrawerContent {...props} />}>
//       <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen}
//         options={{
//           title: 'Home', headerShown: false,
//           drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />)
//         }} />
//         <MainNavigator.Screen name='Vervo' component={VervoNavigatorScreen}
//         options={{
//           title: 'Vervo', headerShown: false,
//           drawerIcon: ({ focused, size }) => (<Icon name='cutlery' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
//         }} />

//     </MainNavigator.Navigator>
//   );
// }

// class Main extends Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <MainNavigatorScreen />
//       </NavigationContainer>
//     );
//   }
//   componentDidMount() {
//     // redux
//     this.props.fetchLeaders();
//     this.props.fetchDishes();
//     this.props.fetchComments();
//     this.props.fetchPromos();
//   }
// }
// export default connect(null, mapDispatchToProps)(Main);
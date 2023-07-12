import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

export default function App() {
  const Stack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();

  const ExpensesOverview = () => {
    return (
      <BottomTab.Navigator screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor : GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => <IconButton iconName='add' 
                                          size={24} 
                                          color={tintColor} 
                                          onPress={() => {
                                            navigation.navigate('ManageExpense')
                                          }} />
        }
        )}
      >
        <BottomTab.Screen name='RecentExpenses' component={RecentExpenses}
                          options={{
                            title: 'Recent Expenses',
                            tabBarLabel: 'Recent',
                            tabBarIcon: ({ color, size }) => (
                              <Ionicons name="hourglass" size={size} color={color} />
                            )
                          }} />
        <BottomTab.Screen name='AllExpenses' component={AllExpenses}
                          options={{
                            title: 'All Expenses',
                            tabBarLabel: 'All',
                            tabBarIcon: ({ color, size }) => (
                              <Ionicons name="calendar" size={size} color={color} />
                            ) 
                          }}/>
      </BottomTab.Navigator>
    )
  }

  return (
    <>
    <StatusBar style="light" />
    <ExpensesContextProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white'
        }} 
        initialRouteName='ExpensesOverview'
      >
        <Stack.Screen name='ExpensesOverview' component={ExpensesOverview}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name='ManageExpense' 
                      component={ManageExpense}
                      options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ExpensesContextProvider>

    </>
  );
}

const styles = StyleSheet.create({
 
});

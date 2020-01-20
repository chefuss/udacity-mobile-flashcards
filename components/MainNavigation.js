import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Dashboard from './Dashboard'
import DeckDetails from './DeckDetails'
import AddCard from './AddCard'

const MainNavigation = createStackNavigator({
    Home: {
        screen: Dashboard
    },
    DeckDetails: {
        screen: DeckDetails
    },
    AddCard: {
        screen: AddCard
    },
    DeckDetails: {
        screen: DeckDetails
    }
},{
    initialRouteName: 'Home'
})


export default createAppContainer(MainNavigation)
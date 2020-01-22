import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Dashboard from './Dashboard'
import DeckDetails from './DeckDetails'
import Deck from './Deck'
import AddCard from './AddCard'
import AddDeck from './AddDeck'
import Quiz from './Quiz'

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
    Deck: {
        screen: Deck
    },
    AddDeck: {
        screen: AddDeck
    },
    Quiz: {
        screen: Quiz
    }
},{
    initialRouteName: 'Home'
})


export default createAppContainer(MainNavigation)
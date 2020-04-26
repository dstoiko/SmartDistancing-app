import UserActions from './UserRedux'
import Prefix from './PrefixRedux'

const ActionsRedux = {
  [Prefix.user]: UserActions
}

export default ActionsRedux

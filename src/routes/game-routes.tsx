import { Route } from 'react-router-dom'
import jeopardyRoutes from './jeopardy-routes'
import hangmanRoutes from './hangman-routes'




export default[
    <Route key="game-routes">
    {jeopardyRoutes}
    {hangmanRoutes}
    </Route>
]
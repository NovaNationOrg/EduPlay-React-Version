import { Route } from 'react-router-dom'
import jeopardyRoutes from './jeopardy-routes'
import hangmanRoutes from './hangman-routes'
import ResultsPage from '../pages/results-page'


export default[
    <Route key="game-routes">
    {jeopardyRoutes}
    {hangmanRoutes}
    <Route key ="result_page" path="gameResult" element = {<ResultsPage />} />
    </Route>
]
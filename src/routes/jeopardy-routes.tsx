import { Route } from 'react-router-dom'
import QuestionPage from '../pages/Jeopardy/question-page'
import ListPage from '../pages/Jeopardy/list-page'
import ResultsPage from '../pages/Jeopardy/results-page'



export default[
    <Route key ="page1" path="jeopardyGame" element={<ListPage />} />,
    <Route key ="page2" path="jeopardyGame/question" element={<QuestionPage />} />,
    <Route key ="page3" path="jeopardyGame/results" element = {<ResultsPage />} />
]
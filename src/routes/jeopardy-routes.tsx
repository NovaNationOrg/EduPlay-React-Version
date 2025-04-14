import { Route } from 'react-router-dom'
import QuestionPage from '../pages/Jeopardy/question-page'
import ListPage from '../pages/Jeopardy/list-page'



export default[
    <Route key ="_jp_page1" path="jeopardy" element={<ListPage />} />,
    <Route key ="_jp_page2" path="jeopardy/question" element={<QuestionPage />} />,
]
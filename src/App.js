import {RouterProvider} from 'react-router-dom'
import {router} from "./lib/routes";

export default function App() {
  return <RouterProvider router={router}/>
}

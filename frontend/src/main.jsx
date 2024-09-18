import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/ReactToastify.css'
import {Provider} from 'react-redux'
import {store} from './redux/store.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
    <Provider store ={store}>
    <App/>
    </Provider>
 
 
)

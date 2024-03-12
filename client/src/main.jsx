import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {HomePage} from './pages/HomePage.jsx'
import {SignInPage} from './pages/SignInPage.jsx'
import {SignupPage} from './pages/SignupPage.jsx'
import {ForgotPasswordPage} from './pages/ForgotPasswordPage.jsx'
import {PasswordResetPage} from './pages/PasswordResetPage.jsx'
import {TextToImagePage} from './pages/TextToImagePage.jsx'
import {DetailedImageToImageEditing} from './pages/DetailedImageToImageEditing.jsx'
import {ImageToImageEditingPage} from './pages/ImageToImageEditingPage.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/signin' element={<SignInPage/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}></Route>
      <Route path='/reset-password/:token' element={<PasswordResetPage/>}></Route>
      <Route path='/text-to-image' element={<TextToImagePage/>}></Route>
      <Route path='/image-to-image-edit' element={<ImageToImageEditingPage/>}></Route>
      <Route path='/image-to-image-detail-edit' element={<DetailedImageToImageEditing/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

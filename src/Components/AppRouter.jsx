import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import OTP from './OTP'

//  user imports
import SignUp from './User/SignUp'
import ForgetPassword from './User/ForgetPassword'
import UpdatePassword from './User/UpdatePassword'
import Home from './User/Home'
import AddProducts from './User/AddProducts'
import ListInventory from './User/ListInventory'
import ProfilePage from './User/ProfilePage'
import AddCategory from './User/AddCategory'
import PurchaseHistoryDisplay from './Purchase History/PurchaseHistoryDisplay'

// Admin imports
import AddAdmin from './Admin/AddAdmin'
import AddRecipe from './Admin/AddRecipe'
import ListRecipes from './Admin/ListRecipes'
import AdminDashboard from './Admin/AdminDashboard'
import AdminRecipeListing from './Admin/AdminRecipeListing'
import ListAdmin from './Admin/ListAdmin'
import Page404 from './Page404'

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Page404 />} />
      
            <Route path="/forgetPswd" element={<ForgetPassword />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/inventory" element={<ListInventory />} />
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/addProduct" element={<AddProducts />} />
            <Route path="/recipes" element={<ListRecipes />} />
            <Route path="/profilePage" element={<ProfilePage />} />
            <Route path="/purchaseHistory" element={<PurchaseHistoryDisplay />} />

            <Route path="/addAdmin" element={<AddAdmin />} />
            <Route path="/addRecipe" element={<AddRecipe />} />
            <Route path="/dashboard" element={<AdminDashboard />} />            
            <Route path="/manageRecipe" element={<AdminRecipeListing />} />            
            <Route path="/manageAdmin" element={<ListAdmin />} />            
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

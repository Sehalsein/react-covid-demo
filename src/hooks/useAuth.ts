import { AuthContext } from '@/src/context/AuthProvider'
import { useContext } from 'react'

export const useAuth = () => useContext(AuthContext)

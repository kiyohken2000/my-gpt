import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Platform } from "react-native";
import { googleSheetUrl } from "../config";
import { formatData } from "../utils/utilFunctions";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({})
  const [isReview, setIsReview] = useState(false)

  const getReviewStatus = async() => {
    try {
      const { data } = await axios.get(googleSheetUrl)
      const _data = formatData({data})
      if(_data[0].nowReview === '31' && Platform.OS === 'ios') {
        console.log('レビュー中')
        setIsReview(true)
      } else {
        console.log('レビュー中ではない')
      }
    } catch(e) {
      console.log('get review status error', e)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user, setUser,
        isReview, setIsReview,
        getReviewStatus,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
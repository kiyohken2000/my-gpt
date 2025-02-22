import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Platform } from "react-native";
import { googleSheetUrl, iosBuildNumber, androidVersionCode } from "../config";
import { formatData } from "../utils/utilFunctions";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({})
  const [isReview, setIsReview] = useState(false)
  const [imgbbKey, setImgbbKey] = useState('')
  const [isSongEnable, setIsSongEnalbe] = useState(false)
  const [isVideoEnable, setIsVideoEnable] = useState(false)

  const getReviewStatus = async() => {
    try {
      const { data } = await axios.get(googleSheetUrl)
      const _data = formatData({data})
      setImgbbKey(_data[0].imgbbKey)
      setIsSongEnalbe(_data[0].song === '1')
      setIsVideoEnable(_data[0].video === '1')
      if(_data[0].nowReview === iosBuildNumber && Platform.OS === 'ios') {
        console.log('ios レビュー中')
        setIsReview(true)
      } else if(_data[0].androidVersionCode === androidVersionCode && Platform.OS ==='android') {
        console.log('android レビュー中')
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
        imgbbKey, setImgbbKey,
        isSongEnable, setIsSongEnalbe,
        isVideoEnable, setIsVideoEnable,
        getReviewStatus,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
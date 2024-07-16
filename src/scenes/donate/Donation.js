import React, { useEffect, useState} from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { colors, fontSize } from "../../theme";
import Purchases from "react-native-purchases";
import Button from "../../components/Button";
import { showToast } from "../../utils/showToast";

const platformLabel = Platform.select({
  ios: 'Apple',
  android: 'Google',
})

export default function Donation() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentOffering, setCurrentOffering] = useState([])

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        const offerings = await Purchases.getOfferings();
        setCurrentOffering(offerings.current.availablePackages);
      } catch(e) {
        console.log('fetch products error', e)
      }
    }
    fetchProducts()
  }, [])

  const onDonatePress = async({pkg}) => {
    try {
      setIsLoading(true)
      const { customerInfo } = await Purchases.purchasePackage(pkg)
      console.log(customerInfo)
      showToast({title: 'ご支援ありがとうございます'})
    } catch(e) {
      console.log('on donate error', e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.element}>
        <Text style={styles.title}>個人でガチ有能AI助手を制作しています。サーバー使用料に充てるために支援をいただけたら幸いです。</Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.label}>ご支援いただく際の注意事項</Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.label}>・ご支援いただいた方のご要望を優先的に実装する、などの特典はありません。支援＝制作者への寄付であることを何卒ご了承ください。</Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.label}>・ご支援いただいた日付や回数などの履歴はアプリ内に記録していません。{platformLabel}からの領収書メールや、アカウントの購入履歴などからご確認ください。</Text>
      </View>
      {currentOffering.map((pkg, i) => {
        return (
          <Button
            key={pkg.identifier}
            label='寄付する 700円'
            onPress={() => onDonatePress({pkg})}
            color={colors.purple}
            disable={false}
            labelColor={colors.white}
            labelBold={false}
            isLoading={isLoading}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  title: {
    fontSize: fontSize.xxLarge,
    textAlign: 'center'
  },
  label: {
    fontSize: fontSize.middle
  },
  element: {
    paddingBottom: 20
  }
})
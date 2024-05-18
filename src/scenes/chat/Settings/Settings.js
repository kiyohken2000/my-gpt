import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors, fontSize } from "../../../theme";
import Button from "../../../components/Button";
import { saveNegativePrompt } from "../../../utils/textGenerate";
import NegativePromptItem from "./NegativePromptItem";
import { UserContext } from "../../../contexts/UserContext";
import { imageModelData } from "../../../imageModelData";

export default function Settings(props) {
  const {
    setSheetPosition,
    negativePromptRealisticVision, setNegativePromptRealisticVision,
    negativePromptAnimagine, setNegativePromptAnimagine,
    negativePromptPony, setNegativePromptPony,
    negativePromptPvc, setNegativePromptPvc,
    negativePromptChillOut, setNegativePromptChillOut,
    negativePromptNsfwGenAnime, setNegativePromptNsfwGenAnime,
    negativePromptNovelAIRemix, setNegativePromptNovelAIRemix,
    negativePromptNsfwGen, setNegativePromptNsfwGen,
    negativePromptDeliberate, setNegativePromptDeliberate,
    negativePromptRealPony, setNegativePromptRealPony,
    negativePromptArtiWaifu, setNegativePromptArtiWaifu,
    negativePromptStarryXL, setNegativePromptStarryXL,
  } = props
  const { isReview } = useContext(UserContext)

  const onOkPress = async() => {
    await saveNegativePrompt({
      negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
      negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
      negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
    })
    setSheetPosition(0)
  }

  return (
   <View style={styles.container}>
    <View style={{alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
      <Text style={styles.label}>ネガティブプロンプト</Text>
    </View>
    <ScrollView>
    <KeyboardAwareScrollView enableOnAndroid={true}>
      <NegativePromptItem
        label={imageModelData.RealisticVision.label}
        negativePrompt={negativePromptRealisticVision}
        setNegativePrompt={setNegativePromptRealisticVision}
        recommendNegativePrompt={imageModelData.RealisticVision.recommendNegativePrompt}
      />
      {!isReview?
        <NegativePromptItem
          label={imageModelData.Animagine.label}
          negativePrompt={negativePromptAnimagine}
          setNegativePrompt={setNegativePromptAnimagine}
          recommendNegativePrompt={imageModelData.Animagine.recommendNegativePrompt}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label={imageModelData.Pony.label}
          negativePrompt={negativePromptPony}
          setNegativePrompt={setNegativePromptPony}
          recommendNegativePrompt={imageModelData.Pony.recommendNegativePrompt}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label={imageModelData.PVC.label}
          negativePrompt={negativePromptPvc}
          setNegativePrompt={setNegativePromptPvc}
          recommendNegativePrompt={imageModelData.PVC.recommendNegativePrompt}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label={imageModelData.ChilloutMix.label}
          negativePrompt={negativePromptChillOut}
          setNegativePrompt={setNegativePromptChillOut}
          recommendNegativePrompt={imageModelData.ChilloutMix.recommendNegativePrompt}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label={imageModelData.NsfwGenAnime.label}
          negativePrompt={negativePromptNsfwGenAnime}
          setNegativePrompt={setNegativePromptNsfwGenAnime}
          recommendNegativePrompt={imageModelData.NsfwGenAnime.recommendNegativePrompt}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label={imageModelData.NovelAIRemix.label}
          negativePrompt={negativePromptNovelAIRemix}
          setNegativePrompt={setNegativePromptNovelAIRemix}
          recommendNegativePrompt={imageModelData.NovelAIRemix.recommendNegativePrompt}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label={imageModelData.NsfwGen.label}
          negativePrompt={negativePromptNsfwGen}
          setNegativePrompt={setNegativePromptNsfwGen}
          recommendNegativePrompt={imageModelData.NsfwGen.recommendNegativePrompt}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label={imageModelData.Deliberate.label}
          negativePrompt={negativePromptDeliberate}
          setNegativePrompt={setNegativePromptDeliberate}
          recommendNegativePrompt={imageModelData.Deliberate.recommendNegativePrompt}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label={imageModelData.RealPony.label}
          negativePrompt={negativePromptRealPony}
          setNegativePrompt={setNegativePromptRealPony}
          recommendNegativePrompt={imageModelData.RealPony.recommendNegativePrompt}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label={imageModelData.ArtiWaifu.label}
          negativePrompt={negativePromptArtiWaifu}
          setNegativePrompt={setNegativePromptArtiWaifu}
          recommendNegativePrompt={imageModelData.ArtiWaifu.recommendNegativePrompt}
        />
        :null
      }
      {!isReview?
        <NegativePromptItem
          label={imageModelData.StarryXL.label}
          negativePrompt={negativePromptStarryXL}
          setNegativePrompt={setNegativePromptStarryXL}
          recommendNegativePrompt={imageModelData.StarryXL.recommendNegativePrompt}
        />
        :null
      }
    </KeyboardAwareScrollView>  
    </ScrollView>
    <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
      <Button
        label='決定'
        onPress={onOkPress}
        color={colors.purple}
        disable={false}
        labelColor={colors.white}
        labelBold={false}
      />
      <View style={{paddingVertical: 10}} />
      <Button
        label='閉じる'
        onPress={() => setSheetPosition(0)}
        color={colors.gray}
        disable={false}
        labelColor={colors.white}
        labelBold={false}
      />
    </View>
   </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: fontSize.large
  },
})
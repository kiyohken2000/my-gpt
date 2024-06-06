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
    negativePromptYakiDofuMix, setNegativePromptYakiDofuMix,
    negativePromptEbaraPony, setNegativePromptEbaraPony,
    negativePromptWaiANIMIXPONYXL, setNegativePromptWaiANIMIXPONYXL,
    negativePromptWaiREALMIX, setNegativePromptWaiREALMIX,
    negativePromptAnythingXL, setNegativePromptAnythingXL,
    negativePromptWaiREALCN, setNegativePromptWaiREALCN,
    negativePromptAnimeBulldozer, setNegativePromptAnimeBulldozer,
    negativePromptMomoiroPony, setNegativePromptMomoiroPony,
    negativePromptHanamomoPony, setNegativePromptHanamomoPony,
    negativePromptDeepDarkHentaiMix, setNegativePromptDeepDarkHentaiMix,
    negativePromptSeventhAnimeXLPony, setNegativePromptSeventhAnimeXLPony,
    negativePromptRealPonyCuteJp, setNegativePromptRealPonyCuteJp,
    negativePromptRumblexl, setNegativePromptRumblexl,
    negativePromptMix3x3x3xl, setNegativePromptMix3x3x3xl,
    negativePromptYamersAnime, setNegativePromptYamersAnime,
    negativePromptBaxl, setNegativePromptBaxl,
    negativePromptCuteCore, setNegativePromptCuteCore,
    negativePromptFeaturelessMix, setNegativePromptFeaturelessMix,
    negativePromptManmaruMix, setNegativePromptManmaruMix,
    negativePromptChacolOmegaMix, setNegativePromptChacolOmegaMix,
    negativePromptEponaMix, setNegativePromptEponaMix,
    negativePromptPVCMovable, setNegativePromptPVCMovable,
    negativePromptPVCRealistic, setNegativePromptPVCRealistic,
    negativePromptPVCFantasy, setNegativePromptPVCFantasy,
    negativePromptHolodayoXL, setNegativePromptHolodayoXL,
    negativePromptKivotosXL, setNegativePromptKivotosXL,
  } = props
  const { isReview } = useContext(UserContext)

  const onOkPress = async() => {
    await saveNegativePrompt({
      negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
      negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
      negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
      negativePromptYakiDofuMix, negativePromptEbaraPony, negativePromptWaiANIMIXPONYXL, negativePromptWaiREALMIX,
      negativePromptAnythingXL, negativePromptWaiREALCN, negativePromptAnimeBulldozer, negativePromptMomoiroPony,
      negativePromptHanamomoPony, negativePromptDeepDarkHentaiMix, negativePromptSeventhAnimeXLPony, negativePromptRealPonyCuteJp,
      negativePromptRumblexl, negativePromptMix3x3x3xl, negativePromptYamersAnime, negativePromptBaxl,
      negativePromptCuteCore, negativePromptFeaturelessMix, negativePromptManmaruMix, negativePromptChacolOmegaMix,
      negativePromptEponaMix, negativePromptPVCMovable, negativePromptPVCRealistic, negativePromptPVCFantasy,
      negativePromptHolodayoXL, negativePromptKivotosXL,
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
      {/* ↓↓↓実写↓↓↓ */}
        <NegativePromptItem
          label={imageModelData.RealisticVision.label}
          negativePrompt={negativePromptRealisticVision}
          setNegativePrompt={setNegativePromptRealisticVision}
          recommendNegativePrompt={imageModelData.RealisticVision.recommendNegativePrompt}
        />
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
            label={imageModelData.NsfwGen.label}
            negativePrompt={negativePromptNsfwGen}
            setNegativePrompt={setNegativePromptNsfwGen}
            recommendNegativePrompt={imageModelData.NsfwGen.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.Rumblexl.label}
            negativePrompt={negativePromptRumblexl}
            setNegativePrompt={setNegativePromptRumblexl}
            recommendNegativePrompt={imageModelData.Rumblexl.recommendNegativePrompt}
          />
          :null
        }
      {/* ↑↑↑実写↑↑↑ */}
      {/* ↓↓↓実写(Pony)↓↓↓ */}
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
            label={imageModelData.waiREALMIX.label}
            negativePrompt={negativePromptWaiREALMIX}
            setNegativePrompt={setNegativePromptWaiREALMIX}
            recommendNegativePrompt={imageModelData.waiREALMIX.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.waiREALCN.label}
            negativePrompt={negativePromptWaiREALCN}
            setNegativePrompt={setNegativePromptWaiREALCN}
            recommendNegativePrompt={imageModelData.waiREALCN.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.RealPonyCuteJp.label}
            negativePrompt={negativePromptRealPonyCuteJp}
            setNegativePrompt={setNegativePromptRealPonyCuteJp}
            recommendNegativePrompt={imageModelData.RealPonyCuteJp.recommendNegativePrompt}
          />
          :null
        }
      {/* ↑↑↑実写(Pony)↑↑↑ */}
      {/* ↓↓↓アニメ↓↓↓ */}
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
            label={imageModelData.Deliberate.label}
            negativePrompt={negativePromptDeliberate}
            setNegativePrompt={setNegativePromptDeliberate}
            recommendNegativePrompt={imageModelData.Deliberate.recommendNegativePrompt}
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
        {!isReview?
          <NegativePromptItem
            label={imageModelData.YakiDofuMix.label}
            negativePrompt={negativePromptYakiDofuMix}
            setNegativePrompt={setNegativePromptYakiDofuMix}
            recommendNegativePrompt={imageModelData.YakiDofuMix.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.AnythingXL.label}
            negativePrompt={negativePromptAnythingXL}
            setNegativePrompt={setNegativePromptAnythingXL}
            recommendNegativePrompt={imageModelData.AnythingXL.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.AnimeBulldozer.label}
            negativePrompt={negativePromptAnimeBulldozer}
            setNegativePrompt={setNegativePromptAnimeBulldozer}
            recommendNegativePrompt={imageModelData.AnimeBulldozer.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.DeepDarkHentaiMix.label}
            negativePrompt={negativePromptDeepDarkHentaiMix}
            setNegativePrompt={setNegativePromptDeepDarkHentaiMix}
            recommendNegativePrompt={imageModelData.DeepDarkHentaiMix.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.YamersAnime.label}
            negativePrompt={negativePromptYamersAnime}
            setNegativePrompt={setNegativePromptYamersAnime}
            recommendNegativePrompt={imageModelData.YamersAnime.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.Baxl.label}
            negativePrompt={negativePromptBaxl}
            setNegativePrompt={setNegativePromptBaxl}
            recommendNegativePrompt={imageModelData.Baxl.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.CuteCore.label}
            negativePrompt={negativePromptCuteCore}
            setNegativePrompt={setNegativePromptCuteCore}
            recommendNegativePrompt={imageModelData.CuteCore.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.HolodayoXL.label}
            negativePrompt={negativePromptHolodayoXL}
            setNegativePrompt={setNegativePromptHolodayoXL}
            recommendNegativePrompt={imageModelData.HolodayoXL.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.KivotosXL.label}
            negativePrompt={negativePromptKivotosXL}
            setNegativePrompt={setNegativePromptKivotosXL}
            recommendNegativePrompt={imageModelData.KivotosXL.recommendNegativePrompt}
          />
          :null
        }
      {/* ↑↑↑アニメ↑↑↑ */}
      {/* ↓↓↓アニメ(Pony)↓↓↓ */}
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
            label={imageModelData.EbaraPony.label}
            negativePrompt={negativePromptEbaraPony}
            setNegativePrompt={setNegativePromptEbaraPony}
            recommendNegativePrompt={imageModelData.EbaraPony.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.waiANIMIXPONYXL.label}
            negativePrompt={negativePromptWaiANIMIXPONYXL}
            setNegativePrompt={setNegativePromptWaiANIMIXPONYXL}
            recommendNegativePrompt={imageModelData.waiANIMIXPONYXL.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.MomoiroPony.label}
            negativePrompt={negativePromptMomoiroPony}
            setNegativePrompt={setNegativePromptMomoiroPony}
            recommendNegativePrompt={imageModelData.MomoiroPony.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.HanamomoPony.label}
            negativePrompt={negativePromptHanamomoPony}
            setNegativePrompt={setNegativePromptHanamomoPony}
            recommendNegativePrompt={imageModelData.HanamomoPony.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.SeventhAnimeXLPony.label}
            negativePrompt={negativePromptSeventhAnimeXLPony}
            setNegativePrompt={setNegativePromptSeventhAnimeXLPony}
            recommendNegativePrompt={imageModelData.SeventhAnimeXLPony.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.Mix3x3x3xl.label}
            negativePrompt={negativePromptMix3x3x3xl}
            setNegativePrompt={setNegativePromptMix3x3x3xl}
            recommendNegativePrompt={imageModelData.Mix3x3x3xl.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.FeaturelessMix.label}
            negativePrompt={negativePromptFeaturelessMix}
            setNegativePrompt={setNegativePromptFeaturelessMix}
            recommendNegativePrompt={imageModelData.FeaturelessMix.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.ManmaruMix.label}
            negativePrompt={negativePromptManmaruMix}
            setNegativePrompt={setNegativePromptManmaruMix}
            recommendNegativePrompt={imageModelData.ManmaruMix.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.ChacolOmegaMix.label}
            negativePrompt={negativePromptChacolOmegaMix}
            setNegativePrompt={setNegativePromptChacolOmegaMix}
            recommendNegativePrompt={imageModelData.ChacolOmegaMix.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.EponaMix.label}
            negativePrompt={negativePromptEponaMix}
            setNegativePrompt={setNegativePromptEponaMix}
            recommendNegativePrompt={imageModelData.EponaMix.recommendNegativePrompt}
          />
          :null
        }
      {/* ↑↑↑アニメ(Pony)↑↑↑ */}
      {/* ↓↓↓フィギュア↓↓↓ */}
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
            label={imageModelData.PVCRealistic.label}
            negativePrompt={negativePromptPVCRealistic}
            setNegativePrompt={setNegativePromptPVCRealistic}
            recommendNegativePrompt={imageModelData.PVCRealistic.recommendNegativePrompt}
          />
          :null
        }
        {!isReview?
          <NegativePromptItem
            label={imageModelData.PVCFantasy.label}
            negativePrompt={negativePromptPVCFantasy}
            setNegativePrompt={setNegativePromptPVCFantasy}
            recommendNegativePrompt={imageModelData.PVCFantasy.recommendNegativePrompt}
          />
          :null
        }
      {/* ↑↑↑フィギュア↑↑↑ */}
      {/* ↓↓↓フィギュア(Pony)↓↓↓ */}
      {!isReview?
        <NegativePromptItem
          label={imageModelData.PVCMovable.label}
          negativePrompt={negativePromptPVCMovable}
          setNegativePrompt={setNegativePromptPVCMovable}
          recommendNegativePrompt={imageModelData.PVCMovable.recommendNegativePrompt}
        />
        :null
      }
      {/* ↑↑↑フィギュア(Pony)↑↑↑ */}
      {/* 未分類 */}
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
import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text } from "react-native";
import { 
  Menu, 
  MenuOptions, 
  MenuOption, 
  MenuTrigger,
} from 'react-native-popup-menu';
import { sleep } from "../../../utils/utilFunctions";
import { UserContext } from "../../../contexts/UserContext";
import { imageModelData } from "../../../imageModelData";
import DrawButtonItem from "./DrawButtonItem";
import { colors, fontSize } from "../../../theme";
import Anchor from "./Anchor";
import Divider from "./Divider";

const { height } = Dimensions.get('window');

export default function DrawButton(props) {
  const { isImageMode, setIsImageMode, setSheetPosition } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const { isReview } = useContext(UserContext);

  const handleOptionSelect = async(val) => {
    console.log({val})
    setIsImageMode(val);
  };

  const handleSettingsPress = async() => {
    await sleep(500);
    setSheetPosition(1);
  };

  return (
    <View style={styles.container}>
      <Menu
        onOpen={() => setMenuOpen(true)}
        onClose={() => setMenuOpen(false)}
      >
        <MenuTrigger>
          <Anchor isImageMode={isImageMode} />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption onSelect={() => handleOptionSelect(0)}>
            <View style={styles.menuItem}>
              <Text style={styles.optionText}>{`画像生成オフ${!isImageMode ? '✔' : ''}`}</Text>
            </View>
          </MenuOption>
          <Divider isReview={false} />
          
          <ScrollView style={{maxHeight: height * 0.7}}>
            {/* ↓↓↓実写↓↓↓ */}
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={false}
              isImageMode={isImageMode}
              item={imageModelData.RealisticVision}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={false}
              isImageMode={isImageMode}
              item={imageModelData.JuggernautXL}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.ChilloutMix}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.NsfwGen}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.Rumblexl}
            />
            {/* ↑↑↑実写↑↑↑ */}
            <Divider isReview={isReview} />
            
            {/* ↓↓↓実写(Pony)↓↓↓ */}
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.RealPony}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.waiREALMIX}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.waiREALCN}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.RealPonyCuteJp}
            />
            {/* ↑↑↑実写(Pony)↑↑↑ */}
            <Divider isReview={isReview} />
            
            {/* ↓↓↓実写(Illustrious)↓↓↓ */}
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.Noobreal}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.Redcraft}
            />
            {/* ↑↑↑実写(Illustrious)↑↑↑ */}
            <Divider isReview={isReview} />
            
            {/* ↓↓↓アニメ↓↓↓ */}
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.Animagine}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.NsfwGenAnime}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.NovelAIRemix}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.Deliberate}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.ArtiWaifu}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.StarryXL}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.YakiDofuMix}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.AnythingXL}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.AnimeBulldozer}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.DeepDarkHentaiMix}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.YamersAnime}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.Baxl}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.CuteCore}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.HolodayoXL}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.KivotosXL}
            />
            {/* ↑↑↑アニメ↑↑↑ */}
            <Divider isReview={isReview} />
            
            {/* ↓↓↓アニメ(Pony)↓↓↓ */}
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.Pony}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.EbaraPony}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.waiANIMIXPONYXL}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.MomoiroPony}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.HanamomoPony}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.SeventhAnimeXLPony}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.Mix3x3x3xl}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.FeaturelessMix}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.ManmaruMix}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.ChacolOmegaMix}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.EponaMix}
            />
            {/* ↑↑↑アニメ(Pony)↑↑↑ */}
            <Divider isReview={isReview} />
            
            {/* ↓↓↓アニメ(Illustrious)↓↓↓ */}
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.NovaAnimeXL}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.WaiNSFWIllustrious}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.ShiitakeMix}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.MatureRitual}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.NovaFurryXL}
            />
            {/* ↑↑↑アニメ(Illustrious)↑↑↑ */}
            <Divider isReview={isReview} />
            
            {/* ↓↓↓フィギュア↓↓↓ */}
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.PVC}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.PVCRealistic}
            />
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.PVCFantasy}
            />
            {/* ↑↑↑フィギュア↑↑↑ */}
            <Divider isReview={isReview} />
            
            {/* ↓↓↓フィギュア(Pony)↓↓↓ */}
            <DrawButtonItem
              onItemPress={handleOptionSelect}
              disable={isReview}
              isImageMode={isImageMode}
              item={imageModelData.PVCMovable}
            />
            {/* ↑↑↑フィギュア(Pony)↑↑↑ */}
            <Divider isReview={false} />
          </ScrollView>
          
          <MenuOption onSelect={handleSettingsPress}>
            <View style={styles.menuItem}>
              <Text style={styles.optionText}>画像生成設定</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}

const optionsStyles = {
  optionsContainer: {
    maxHeight: height * 0.9
  }
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 14,
    color: colors.text
  },
});
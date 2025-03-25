import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import FontIcon from 'react-native-vector-icons/Feather';
import { 
  Menu, 
  MenuOptions, 
  MenuOption, 
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';
import { colors, fontSize } from "../../theme";
import { getQuotaInformation } from "../../utils/songGenerate";
import { showToast } from "../../utils/showToast";

export default function SongButton(props) {
  const { isSongMode, setIsSongMode } = props;
  const [songsQuota, setSongsQuota] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchSongsQuota = async() => {
      if(menuOpen) {
        setIsLoading(true);
        const res = await getQuotaInformation();
        setSongsQuota(res);
        setIsLoading(false);
      }
    };
    fetchSongsQuota();
  }, [menuOpen]);

  const handleOptionSelect = (value) => {
    setIsSongMode(value);
  };

  const handleSongsQuotaPress = () => {
    if(isLoading) return;
    showToast({title: `あと${songsQuota}曲生成できます`});
  };

  return (
    <View style={styles.container}>
      <Menu
        onOpen={() => setMenuOpen(true)}
        onClose={() => setMenuOpen(false)}
      >
        <MenuTrigger>
          <FontIcon
            name="music"
            color={isSongMode ? colors.redPrimary : colors.white}
            size={fontSize.xxxxxxxLarge}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => handleOptionSelect(true)}>
            <View style={styles.menuItem}>
              <Text style={styles.optionText}>{`音楽生成オン${isSongMode ? '✔' : ''}`}</Text>
            </View>
          </MenuOption>
          <View style={styles.divider} />
          <MenuOption onSelect={() => handleOptionSelect(false)}>
            <View style={styles.menuItem}>
              <Text style={styles.optionText}>{`音楽生成オフ${!isSongMode ? '✔' : ''}`}</Text>
            </View>
          </MenuOption>
          <View style={styles.divider} />
          <MenuOption onSelect={handleSongsQuotaPress}>
            <View style={styles.menuItem}>
              <Text style={styles.optionText}>{isLoading ? 'Loading...' : `残り${songsQuota}曲`}</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
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
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 2
  }
});
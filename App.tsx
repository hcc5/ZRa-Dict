import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import { Platform } from 'react-native';

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => { },
        };
      },
    };
  }
  const db = SQLite.openDatabase("db.db");
  return db;
}
const db = openDatabase();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const createTableAccount = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists account (id integer primary key not null, username text, fullname text, password text, role int);"
      );
    });
  }
  const createTableDictionary = () => {
    db.transaction((tx) => {
      //tx.executeSql('DROP TABLE IF EXISTS dictionary', []);
      tx.executeSql(
        "create table if not exists dictionary(id integer primary key not null, key_vn text, description_vn text, key_ru text, description_ru text, is_rada VARCHAR(20));"
      );
    });
  }
  React.useEffect(() => {
    createTableAccount();
    createTableDictionary();
  }, []);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

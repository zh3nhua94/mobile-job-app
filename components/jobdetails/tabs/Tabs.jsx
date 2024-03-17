import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import styles from "./tabs.style";
import { SIZES } from "../../../constants";

const TabButton = ({ label, activeTab, setActiveTab }) => {
	return (
		<TouchableOpacity
			style={styles.btn(activeTab, label)}
			onPress={() => setActiveTab(label)}
		>
			<Text style={styles.btnText(activeTab, label)}>{label}</Text>
		</TouchableOpacity>
	);
};

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={tabs}
				keyExtractor={(item) => item}
				horizontal
				renderItem={({ item }) => (
					<TabButton
						setActiveTab={setActiveTab}
						label={item}
						activeTab={activeTab}
					/>
				)}
				contentContainerStyle={{ columnGap: SIZES.small, paddingBottom: 15 }}
			/>
		</View>
	);
};

export default Tabs;

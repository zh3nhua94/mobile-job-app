import React, { useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hooks/useFetch";

const Popularjobs = () => {
	const router = useRouter();
	const { data, isLoading, error } = useFetch("search", {
		query: "React developer",
		num_pages: "1",
	});

	const [selectedJob, setSelectedJob] = useState(null);

	const handleCardPress = (item) => {
		router.push(`/job-details/${item.job_id}`);
		setSelectedJob(item.job_id);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Popular jobs</Text>
				<Text style={styles.headerBtn}>Show all</Text>
			</View>

			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator
						size="large"
						color={COLORS.primary}
					/>
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					<FlatList
						data={data}
						keyExtractor={(item) => item?.job_id}
						renderItem={({ item }) => (
							<PopularJobCard
								item={item}
								selectedJob={selectedJob}
								handleCardPress={handleCardPress}
							/>
						)}
						horizontal
						contentContainerStyle={{ columnGap: SIZES.medium }}
					/>
				)}
			</View>
		</View>
	);
};

export default Popularjobs;

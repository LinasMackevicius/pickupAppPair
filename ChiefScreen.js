import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Button } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import { db } from './firebaseConfig';

const ChiefScreen = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      // Reference to the "venuesData" collection in the database
      const dataRef = ref(db, 'venuesData');

      // Fetch data from the database
      const snapshot = await get(dataRef);

      // Extract the data from the snapshot
      if (snapshot.exists()) {
        setData(Object.values(snapshot.val()));
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      // Set refreshing to false when data fetching is complete
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const handleRefresh = () => {
    // Set refreshing to true and fetch data again
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Retrieve Data from Database</Text>
        <Button title="Refresh" onPress={handleRefresh} disabled={refreshing} />
      </View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.dataItem}>
              {/* Display individual data items */}
              <Text>Venue: {item.venue}</Text>
              <Text>Number of Sets: {item.numberOfSets}</Text>
              {item.photo && (
                <Image
                  source={{ uri: `data:image/jpg;base64,${item.photo.base64}` }}
                  style={styles.photo}
                />
              )}
            </View>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
  },
  dataItem: {
    marginBottom: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ChiefScreen;

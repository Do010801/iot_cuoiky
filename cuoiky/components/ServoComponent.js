// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue, set } from 'firebase/database';

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

// Cấu hình Firebase
const firebaseConfig = {
  // ...thông tin cấu hình firebase
  databaseURL: 'https://iotlightsensor-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, 'SERVO');

const ServoControl = () => {
  const [servoValue, setServoValue] = useState(0);

  useEffect(() => {
    const onValueChange = onValue(dbRef, (snapshot) => { // Sử dụng onValue
      if (snapshot.exists()) {
        setServoValue(snapshot.val().value);
      }
    });

    return () => dbRef.off('value', onValueChange);
  }, []);

  const handleButtonClick = () => {
    const newValue = 1 - servoValue;
    set(dbRef, { value: newValue }); // Sử dụng set để ghi dữ liệu
  };

  return (
    <View style={styles.container}>
    <Card style={styles.card}>
      <Card.Content>
        <Title>Điều khiển SERVO</Title>
        <Paragraph>Giá trị hiện tại: {servoValue}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={handleButtonClick}>
          LÊN / XUỐNG
        </Button>
      </Card.Actions>
    </Card>
    <Card style={styles.card}>
      <Card.Content>
        <Title>Điều khiển SERVO</Title>
        <Paragraph>Giá trị hiện tại: {servoValue}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={handleButtonClick}>
          LÊN / XUỐNG
        </Button>
      </Card.Actions>
    </Card><Card style={styles.card}>
      <Card.Content>
        <Title>Điều khiển SERVO</Title>
        <Paragraph>Giá trị hiện tại: {servoValue}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={handleButtonClick}>
          LÊN / XUỐNG
        </Button>
      </Card.Actions>
    </Card><Card style={styles.card}>
      <Card.Content>
        <Title>Điều khiển SERVO</Title>
        <Paragraph>Giá trị hiện tại: {servoValue}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={handleButtonClick}>
          LÊN / XUỐNG
        </Button>
      </Card.Actions>
    </Card>
  </View>
  );
};

// StyleSheet (Tạo kiểu dáng cho các thành phần)
const styles = StyleSheet.create({
  // container: { 
  //   flex: 1,
  //   padding: 20 ,
  //   alignItems: 'center',
  //   textAlign: 'center'
  // },
  // header: { fontSize: 20, marginBottom: 10 },
  // row: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  // label: { marginRight: 10 },
  // value: { fontWeight: 'bold' },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    elevation: 3, // Tạo hiệu ứng đổ bóng nhẹ
  },

});

export default ServoControl;

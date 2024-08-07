#include <Servo.h>
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <MFRC522.h>

#define SERVO_PIN D8
#define AP_SSID "HSU_Students"
#define AP_PASSWORD "dhhs12cnvch"
#define DB_URL "https://iotlightsensor-default-rtdb.asia-southeast1.firebasedatabase.app/"
#define DB_SECRET "9MM6RlzfEO2g4azepHbw5GdjUoi71MLW1Ye2GQHt"
#define SDA_PIN_RFID D3
#define RST_PIN D4

Servo servo;
FirebaseConfig config;
FirebaseAuth auth;
FirebaseData fbdo;
MFRC522 mfrc522(SDA_PIN_RFID, RST_PIN);

int oldValue = 0;

void setup() {
  Serial.begin(115200);
  initServo();
  initMFRC522();
  initWifi();
  initFirebase();
  setValueToFirebase(0);
}

void loop() {
  String uid = getCardUID();
  if (uid == "13115149166" && oldValue == 0) {
    Serial.println("blue card");
    upServo();
    setValueToFirebase(1);
    oldValue = 1;
  } else if (uid == "83246196149" && oldValue == 1) {
    Serial.println("white card");
    downServo();
    setValueToFirebase(0);
    oldValue = 0;
  }
  delay(100);
}

void initServo() {
  servo.attach(SERVO_PIN);
  servo.write(0);
}

void upServo() {
  for (int pos = 0; pos <= 180; pos += 1) {
    servo.write(pos);
    delay(15); // Add a small delay for smooth movement
  }
}

void downServo() {
  for (int pos = 180; pos >= 0; pos -= 1) {
    servo.write(pos);
    delay(15); // Add a small delay for smooth movement
  }
}

void initMFRC522() {
  SPI.begin();
  mfrc522.PCD_Init();
}

String getCardUID() {
  String uid = "";
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    uid = getCardUIDinDEC(mfrc522.uid.uidByte, mfrc522.uid.size);
  }
  return uid;
}

String getCardUIDinDEC(byte* buffer, byte bufferSize) {
  String result = "";
  for (byte i = 0; i < bufferSize; i++) {
    result += String(buffer[i]);
  }
  return result;
}

void initWifi() {
  Serial.print("\nConnecting to ");
  Serial.print(AP_SSID);
  WiFi.begin(AP_SSID, AP_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nWiFi connected, IP address: ");
  Serial.println(WiFi.localIP());
  WiFi.setAutoReconnect(true);
  WiFi.persistent(true);
}

void initFirebase() {
  config.database_url = DB_URL;
  config.signer.tokens.legacy_token = DB_SECRET;
  Firebase.begin(&config, &auth);
}

void setValueToFirebase(int value) {
  if (Firebase.setInt(fbdo, "/servo_position", value)) {
    Serial.println("Data sent to Firebase successfully.");
  } else {
    Serial.println("Failed to send data to Firebase.");
    Serial.println(fbdo.errorReason());
  }
}

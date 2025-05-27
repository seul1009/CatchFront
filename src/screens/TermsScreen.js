import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const TermsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>이용약관</Text>
      </View>
      <View style={styles.separator} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.text}>
          본 약관은 Catch 앱(이하 “애플리케이션”)에 적용되며, 본 애플리케이션은 [개발자/회사명] (이하 “서비스 제공자”)에 의해 [오픈소스/무료/프리미엄/광고 기반/유료] 서비스 형태로 개발되었습니다.
        </Text>

        <Text style={styles.sectionTitle}>애플리케이션 사용에 대한 동의</Text>
        <Text style={styles.text}>
          사용자가 애플리케이션을 다운로드하거나 이용함으로써 아래의 약관에 자동으로 동의한 것으로 간주됩니다. 애플리케이션을 사용하기 전에 반드시 본 약관을 충분히 읽고 이해하시기 바랍니다.
        </Text>
        <Text style={styles.text}>
          애플리케이션 또는 그 일부, 혹은 당사의 상표를 무단으로 복사하거나 수정하는 행위는 엄격히 금지됩니다. 애플리케이션의 소스코드 추출, 언어 번역, 파생 버전 제작도 허용되지 않습니다. 관련 지적 재산권은 모두 서비스 제공자에게 귀속됩니다.
        </Text>

        <Text style={styles.sectionTitle}>서비스 변경 및 비용 청구</Text>
        <Text style={styles.text}>
          서비스 제공자는 애플리케이션을 최대한 유용하고 효율적으로 제공하기 위해 노력하며, 필요 시 언제든지 앱을 수정하거나 요금을 부과할 수 있습니다. 요금 발생 시 사전 고지됩니다.
        </Text>

        <Text style={styles.sectionTitle}>개인정보 수집 및 보안</Text>
        <Text style={styles.text}>
          애플리케이션은 서비스 제공을 위해 사용자가 제공한 개인정보를 저장하고 처리합니다. 기기의 보안 및 접근 권한 관리는 사용자 책임입니다.
        </Text>
        <Text style={styles.text}>
          루팅(rooting) 또는 탈옥(jailbreaking)은 보안 기능을 해제하여 앱의 정상 작동을 방해할 수 있으므로 권장되지 않습니다.
        </Text>

        <Text style={styles.sectionTitle}>제3자 서비스 이용</Text>
        <Text style={styles.text}>
          애플리케이션은 Google Play 서비스 등 제3자 서비스를 포함할 수 있으며, 해당 서비스의 약관은 별도로 적용되므로 확인이 필요합니다.
        </Text>

        <Text style={styles.sectionTitle}>인터넷 연결 및 요금 관련 면책</Text>
        <Text style={styles.text}>
          일부 기능은 인터넷 연결이 필요합니다. Wi-Fi 또는 데이터가 없으면 앱 일부 기능이 제한될 수 있으며, 이에 대한 책임은 사용자에게 있습니다.
        </Text>
        <Text style={styles.text}>
          데이터 통신 비용, 로밍 요금 등은 사용자의 통신사 계약에 따라 부과되며, 앱 사용 시 이러한 비용을 부담하는 데 동의한 것으로 간주됩니다.
        </Text>

        <Text style={styles.sectionTitle}>기기 상태에 대한 책임</Text>
        <Text style={styles.text}>
          기기가 꺼져 있거나 배터리가 부족하여 서비스를 사용할 수 없는 경우, 그로 인해 발생한 불이익은 사용자 본인의 책임입니다.
        </Text>

        <Text style={styles.sectionTitle}>정보의 정확성과 업데이트</Text>
        <Text style={styles.text}>
          서비스 제공자는 애플리케이션의 정보가 정확하도록 노력하지만, 일부 정보는 제3자를 통해 제공되므로 완전한 정확성을 보장하지 않습니다.
        </Text>
        <Text style={styles.text}>
          정보 오류 또는 미흡한 업데이트로 인해 발생한 손해에 대해서는 책임지지 않습니다.
        </Text>

        <Text style={styles.sectionTitle}>애플리케이션 업데이트 및 종료</Text>
        <Text style={styles.text}>
          운영체제의 요구사항이나 플랫폼 확장에 따라 앱은 업데이트될 수 있으며, 사용자는 이를 수락해야 계속 이용할 수 있습니다.
        </Text>
        <Text style={styles.text}>
          서비스 제공자는 언제든지 사전 통지 없이 앱 제공을 중단할 수 있으며, 종료 시 사용자는 앱 이용을 중단하고 삭제해야 합니다.
        </Text>

        <Text style={styles.sectionTitle}>약관 변경</Text>
        <Text style={styles.text}>
          본 이용약관은 수시로 변경될 수 있으며, 변경사항은 이 페이지에 게시됩니다. 사용자는 정기적으로 확인할 책임이 있습니다.
        </Text>
        <Text style={styles.text}>
          본 약관은 2025년 5월 27일부터 유효합니다.
        </Text>

        <Text style={styles.sectionTitle}>문의하기</Text>
        <Text style={styles.text}>
          이용약관 관련 문의사항이 있는 경우 아래 이메일로 문의해 주세요.
          {"\n"}📧 catchic512@gmail.com
        </Text>
      </ScrollView>

    </View>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  scrollContent: {
    padding: 20,
  },
  text: {
    fontSize: 15.5,
    lineHeight: 26,
    color: '#333',
    marginBottom: 18,
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 24,
    marginBottom: 10,
  },
  bulletList: {
    paddingLeft: 12,
    marginBottom: 10,
  },
});
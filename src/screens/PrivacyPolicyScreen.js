import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>개인정보 처리방침</Text>
      </View>
      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.text}>
          본 개인정보처리방침은 Catch 앱(이하 "애플리케이션")에 적용되며, 본 애플리케이션은 [개발자/회사명] (이하 "서비스 제공자")에 의해 무료 서비스 형태로 개발되었습니다. 본 서비스는 "AS IS"의 형태로 제공됩니다.
        </Text>

        <Text style={styles.sectionTitle}>정보 수집 및 이용</Text>
        <Text style={styles.text}>
          애플리케이션은 사용자가 다운로드하여 사용하는 동안 다음과 같은 정보를 수집할 수 있습니다:
          {'\n'}- 기기의 IP 주소
          {'\n'}- 방문한 페이지, 방문 시간과 날짜, 체류 시간
          {'\n'}- 애플리케이션 사용 시간
          {'\n'}- 모바일 운영체제
        </Text>

        <Text style={styles.text}>
          애플리케이션은 사용자의 정확한 위치 정보를 수집하지 않지만, 대략적인 위치 정보는 수집될 수 있습니다.
          이 정보는 위치 기반 기능 제공, 사용자 행동 분석, 성능 개선을 위해 활용됩니다.
        </Text>

        <Text style={styles.sectionTitle}>사용자 연락 및 마케팅</Text>
        <Text style={styles.text}>
          서비스 제공자는 사용자에게 중요한 알림, 공지사항, 마케팅 정보를 제공하기 위해 수집한 정보를 활용할 수 있습니다.
        </Text>

        <Text style={styles.sectionTitle}>추가 개인정보 수집</Text>
        <Text style={styles.text}>
          더 나은 서비스 제공을 위해 사용자로부터 이름, 주소, 위치, 사진 등의 정보를 요청할 수 있으며, 해당 정보는 본 방침에 따라 보관 및 활용됩니다.
        </Text>

        <Text style={styles.sectionTitle}>제3자 접근</Text>
        <Text style={styles.text}>
          익명화된 데이터만이 외부 서비스에 주기적으로 공유되며, 다음과 같은 경우에만 사용자 정보를 제3자에게 제공할 수 있습니다:
          - 법적 요구가 있을 경우
          - 사용자 및 타인의 안전을 보호하기 위한 경우
          - 외부 서비스 제공자에게 업무 위탁 시 (비독립적 사용 조건 하에)
        </Text>

        <Text style={styles.sectionTitle}>수집 거부(Opt-Out)</Text>
        <Text style={styles.text}>
          사용자는 애플리케이션 삭제를 통해 모든 정보 수집을 중단할 수 있습니다.
        </Text>

        <Text style={styles.sectionTitle}>데이터 보관 및 삭제</Text>
        <Text style={styles.text}>
          서비스 제공자는 사용자가 앱을 사용하는 동안 및 그 후 일정 기간 동안 데이터를 보관합니다. 삭제 요청은 catchic512@gmail.com 으로 문의 주시면 합리적인 시간 내에 처리됩니다.
        </Text>

        <Text style={styles.sectionTitle}>아동 개인정보 보호</Text>
        <Text style={styles.text}>
          본 앱은 만 13세 미만 아동을 대상으로 하지 않으며, 고의적으로 정보를 수집하지 않습니다. 해당 사실이 발견되면 즉시 삭제 조치합니다.
        </Text>

        <Text style={styles.sectionTitle}>보안</Text>
        <Text style={styles.text}>
          서비스 제공자는 사용자의 정보 기밀성을 보호하기 위해 물리적, 전자적, 절차적 보안 조치를 적용하고 있습니다.
        </Text>

        <Text style={styles.sectionTitle}>정책 변경</Text>
        <Text style={styles.text}>
          본 방침은 수시로 변경될 수 있으며, 변경 시 본 페이지를 통해 공지됩니다. 지속적인 앱 사용은 변경 사항에 동의한 것으로 간주됩니다.
        </Text>

        <Text style={styles.sectionTitle}>동의</Text>
        <Text style={styles.text}>
          애플리케이션을 사용함으로써 본 방침에 따라 개인정보가 수집, 처리되는 것에 동의하는 것으로 간주됩니다.
        </Text>

        <Text style={styles.sectionTitle}>문의</Text>
        <Text style={styles.text}>
          개인정보 보호 관련 문의는 아래 이메일로 연락 주시기 바랍니다:
          catchic512@gmail.com
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: { marginRight: 8 },
  backButtonText: { fontSize: 24, color: '#000' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  separator: { height: 1, backgroundColor: '#ddd' },
  scrollContent: { padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 24,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    lineHeight: 26,
    color: '#444',
    marginBottom: 12,
    textAlign: 'left',
  },
});

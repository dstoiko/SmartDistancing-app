/* eslint-env jest */
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

// AsyncStorage module mock
// cf. https://github.com/react-native-community/async-storage/blob/LEGACY/docs/Jest-integration.md
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

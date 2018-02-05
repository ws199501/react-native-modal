/**
 * @desc modal页面的样式
 * @author ws
 * @date 2017-11-17
 **/

import { StyleSheet, PixelRatio, Dimensions} from 'react-native'
//import { Window, Size, Color, Radius } from '../../global'

const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

const Size = {
  pixel: 1 / PixelRatio.get(),
}

const Radius = {
  default: 4,
}

const Color = {
  // 主色调
  primary: '#262738',                  // 绿色
}

const styles = StyleSheet.create({
  modalBox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modalContent: {
    position: 'absolute',
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: Radius.default,
    //left: 50,
    alignSelf: 'center',
    top: (Window.height - 160)/2,
    height: 160,
    //width: Window.width - 100
  },
  bottomContent: {
    position: 'absolute',
    width: Window.width,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOption: {
    flexDirection: 'row',
  },
  modalCancel: {
    flex: 1,
    padding: 15,
    borderTopWidth: Size.pixel,
    borderTopColor: '#cecece',
  },
  modalCancelText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#4a4a4a',
  },
  modalConfirm: {
    flex: 1,
    padding: 15,
    borderLeftWidth: Size.pixel,
    borderLeftColor: Color.primary,
    borderTopWidth: Size.pixel,
    borderTopColor: Color.primary,
    backgroundColor: Color.primary,
    borderBottomRightRadius: Radius.default,
  },
  modalConfirmText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  closeBottom: {
    position: 'absolute',
    top: 10,
    right: 12,
    padding: 4,
  },
})
export default styles

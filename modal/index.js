/**
 * @desc Modal 弹出层
 * @author ws
 * @date 2017-11-15
 * 一 duration 渐入动画持续时间
 * 二 onConfirm() 确认操作
 * 三 onClose() 关闭操作
 * 四 height,width 对话框的宽，高
 * 五 color 对话框的色调
 * 六 confrimText 对话框确认按钮的文字内容, cancelText 对话框取消按钮的文字内容,
 * 七 open() 的时候可以传不同的内容与属性：对话框内容 ( message:'内容'), 需要在onConfirm时候得到的数据 ( data:obj )
 * 八 type 是居中 “确认框”(center) 类型或者居下 “组件框类型”(bottom)
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  Modal,
  Image,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import styles from './style'

const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

export default class Modals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      bottom: new Animated.Value(0 - this.props.height),         // 隐藏
    }
    this.message = '请确认操作'
    // 确认时传回的值
    this.params = {}
    // 确认请求保护pedding，防止多次确定
    this.pedding = false
    // 接受自定义样式
    this.modalConfirm = [ styles.modalConfirm,
      {
        backgroundColor: this.props.color,
        borderLeftColor: this.props.color,
        borderTopColor: this.props.color
      }
    ]
    this.contentStyle = [
      styles.modalContent ,
      {
        height: this.props.height,
        width: this.props.width
      }
    ]
  }

  open(opt) {
    // 恢复可提交状态
    this.pedding = false
    if(opt) {
      // 得到需要传给 onConfirm() 的数据
      opt.data ? this.params = opt.data : null
      opt.message ? this.message = opt.message : null
    }
    // 打开modal
    this.setState({
      visible: true,
    },() => {
      //打开modal后开始动画
      Animated.timing(
        this.state.bottom,
        {
          delay: 50,
          duration: this.props.duration,
          easing: Easing.linear(),
          toValue: this.props.type === 'center' ? (Window.height-this.props.height)/2 : 0,
        }
      ).start()
    })
  }

  close() {
    // 结束动画
    Animated.timing(
      this.state.bottom,
      {
        delay: 0,
        duration: this.props.duration,
        easing: Easing.linear(),
        toValue: 0 - this.props.height,
      }
    ).start()
    //等待动画结束再关闭moadl
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      // 请求保护重置
      this.pedding = false
      this.setState({
        visible: false,
      })
    }, this.props.duration)
  }

  onConfirm() {
    // 关闭modal
    this.close()
    if(this.pedding) {
      null
    }else {
      this.pedding = true
      // 进入等待状态，防止重复提交
      setTimeout(() => {
        //关闭后再执行确认需要的操作防止一些提示性消息提前出现而导致一些问题
        this.props.onConfirm(this.params)
      },this.props.duration)
    }
  }

  renderContent(type) {
    if(type === 'center' && !this.props.children) {
      return (
        <Animated.View style={[...this.contentStyle,{ bottom: this.state.bottom }]} >
          <View style={ styles.message }>
            <Text style={{ color:'#4a4a4a' }}>{ this.message }</Text>
          </View>
          <View style={ styles.modalOption }>
            <TouchableOpacity
              style={ styles.modalCancel }
              onPress={ () => this.close() }
            >
              <Text style={ styles.modalCancelText }>{this.props.cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ this.modalConfirm }
              onPress={ () => this.onConfirm() }
            >
              <Text style={ styles.modalConfirmText }>
                { this.props.confrimText }
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )
    }else if(type === 'center' && this.props.children) {
      return (
        <Animated.View style={[...this.contentStyle,{ bottom: this.state.bottom }]} >
          <View style={ styles.message }>
            { this.props.children }
          </View>
        </Animated.View>
      )
    }else if(type === 'bottom') {
      return (
        <Animated.View style={[styles.bottomContent,{ height: this.props.height,bottom: this.state.bottom}]} >
          {
            this.props.closeBottom ?
              <TouchableOpacity
                style={ styles.closeBottom }
                onPress={ () => this.close() }
              >
                <Image source={require('./icon-close.png')}/>
              </TouchableOpacity>
            : null
          }
          <View style={ styles.message }>
            { this.props.children }
          </View>
        </Animated.View>
      )
    }
  }

  render() {
    return (
      <Modal
        animationType="none"
        transparent={ true }
        onRequestClose={ () => this.close() }
        visible={ this.state.visible }
      >
        <TouchableOpacity
          style={ styles.modalBox }
          onPress={ () => this.close() }
        />
        { this.renderContent(this.props.type) }
      </Modal>
    )
  }
}

Modals.propTypes = {
  onConfirm: PropTypes.func,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  confrimText: PropTypes.string,
  type: PropTypes.oneOf(['center', 'bottom']),
  closeBottom: PropTypes.bool,
  duration: PropTypes.number,
}

Modals.defaultProps = {
  closeBottom: false,
  height: (Window.width - 80)/1.7,
  width: Window.width - 80,
  color: '#DE3619',
  style: {},
  confrimText: '确定',
  cancelText: '取消',
  onConfirm: () => {},
  type: 'center',
  duration: 200,
}

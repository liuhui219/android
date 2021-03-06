import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
	Dimensions,
	ToastAndroid,
	BackAndroid,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
var array = [];
var aa=[];
import Infos from './Infos';
import Status from './Status';
export default class ProjectInfo extends React.Component {

    constructor(props) {
        super(props);
		    this._pressButton = this._pressButton.bind(this);
			  BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
    		this.state = {
              selectedTab:'Infos',
    	  };
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }
		return false;
    }
    componentDidMount() {

    }


	componentWillUnmount() {
	  BackAndroid.removeEventListener('hardwareBackPress', this._pressButton);
	}




    render() {
           return (
                <View style={{flex:1,flexDirection:'column',height:Dimensions.get('window').height,width:Dimensions.get('window').width}}>
                  <TabNavigator tabBarStyle={{ height: 52,}} sceneStyle={{backgroundColor:'#fff'}}>
                      <TabNavigator.Item
                          selected={this.state.selectedTab === 'Infos'}
                          title="详情"
                          renderIcon={() => <Icon name="ios-information-circle-outline" color="#aaa"size={30}  />}
                          renderSelectedIcon={() => <Icon name="ios-information-circle" color="#4385f4"size={30}  />}
                          selectedTitleStyle={{color:'#4385f4'}}
                          titleStyle={{color:'#aaa'}}
                          allowFontScaling={false}
                          onPress={() => this.setState({ selectedTab: 'Infos' })}>
                          <Infos {...this.props}/>
                      </TabNavigator.Item>
                      <TabNavigator.Item
                          selected={this.state.selectedTab === 'Status'}
                          title="动态"
                          renderIcon={() => <Icon name="ios-apps-outline" color="#aaa" size={30}  />}
                          renderSelectedIcon={() => <Icon name="ios-apps" color="#4385f4" size={30}  />}
                          selectedTitleStyle={{color:'#4385f4'}}
                          titleStyle={{color:'#aaa'}}
                          allowFontScaling={false}
                          onPress={() => this.setState({ selectedTab: 'Status' })}>
                          <Status {...this.props}/>
                      </TabNavigator.Item>

                  </TabNavigator>
                  <View style={{position:'absolute',top:35,left:0}}>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
       								  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
       										<Image source={require('../imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
       										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false}>返回</Text>
       								  </View>
       							</TouchableOpacity>
                  </View>
	            </View>
           	)
	}
}
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    flexDirection: 'column',
	backgroundColor:'#fafafa',
  },
  card: {
    height:70,
    paddingTop:25,
	backgroundColor:'#4385f4',
	flexDirection:'row'
  },
  loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    },
	footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },

    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});

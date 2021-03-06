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
  CameraRoll,
  TextInput,
  Keyboard,
  Modal,
  Animated,
	BackAndroid,
	ToastAndroid,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import ProjectInfo from './ProjectInfo';
import RNFS from 'react-native-fs';
let array = [];
let aa=[];
var images = [];
export default class StatusA extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
		  dataSource: new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		  }),
		  id: '',
		  uid:'',
      cid:'',
		  datas:[],
		  imgs:[],
		  loaded: false,
		  isLoadMore:false,
      remark:'',
		  p:1,
		  isReach:false,
		  isRefreshing:false,
		  isNull:false,
		  sx:false,
      add:false,
      domain:'',
      tp:false,
      bottom: new Animated.Value(-60),
      bottoms: new Animated.Value(-110),
      statu:false,
      status:false,
      modalshow:false,
      messages:{},
      give_uid:0,
      shows:false,
      placeholder:'回复内容',
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
        //这里获取传递过来的参数: name

		     array = [];
         aa=[];
         this.setState({domain:data.data.domain,uid:data.data.uid,cid:data.data.cid})

				 this.timer = setTimeout(
			  () => {this.fetchData('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=my_task_list&access_token=' + data.data.token + '&p='+this.state.p); },
			  500
			);
    }

	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);

	}

	toQueryString(obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
			if (Array.isArray(val)) {
				return val.sort().map(function (val2) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
				}).join('&');
			}

			return encodeURIComponent(key) + '=' + encodeURIComponent(val);
		}).join('&') : '';
	}
  fetchData(url) {
		var that=this;
		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'option': 15,
          'cid':this.state.cid,
          'uid':this.state.uid,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
          console.log(result)

					 if(result.list.data != null){

					   result.list.data.forEach((Data,i) => {
						   key={i}

						   array.push(Data);


					   })
					  }
					  if(result.list.count <= 10){
						   that.setState({
							   isReach:true,
							   isLoadMore:false,

						   })
					  }
					  if(result.list.count == 0){
						  that.setState({
							   dataSource: that.state.dataSource.cloneWithRows(['暂无数据']),
							   loaded: true,
							   sx:false,
							   isLoadMore:false,
							   isNull:true,
						   })
					  }else if(array.length > result.list.count){

						   that.setState({
							   isReach:true,
							   isLoadMore:false,
							   isNull:false,

						   })
					   }else{

						   that.setState({
							   dataSource: that.state.dataSource.cloneWithRows(array),
							   loaded: true,
							   sx:false,
							   isNull:false,
						   })
					   }


				})
				.catch((error) => {
					that.setState({

						   loaded: true,
						   sx:true,
						   isReach:true,
						   dataSource: that.state.dataSource.cloneWithRows(['加载失败，请下拉刷新']),

					   })

				  });


	}

  _Info(data){
    var { navigator } = this.props;
    if(navigator) {
      InteractionManager.runAfterInteractions(() => {
        navigator.push({
          name: 'ProjectInfo',
          component: ProjectInfo,
          params: {
            data: data
          }
        })
      })
    }
  }








    render() {
          if(!this.state.loaded){
		  return (
		     <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-90,}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
					</View>
				   </View>
		  )
		}
		return(
      <View style={{flex:1}}>

        <ListView
   			dataSource={this.state.dataSource}
   			renderRow={this.renderMovie.bind(this)}
   			onEndReached={this._onEndReach.bind(this) }
   			onEndReachedThreshold={2}
   			renderFooter={this._renderFooter.bind(this)}
   			refreshControl={
                 <RefreshControl
                   refreshing={this.state.isRefreshing}
                   onRefresh={this._onRefresh.bind(this) }
                   colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
   				progressBackgroundColor="#ffffff"
                   />
               }
   		  />
      </View>

		)





    }


	 renderMovie(data,sectionID: number, rowID: number) {
		if(this.state.sx){
			return(
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-170,}}>
				    <Icon name="ios-sad-outline" color="#ccc"size={70}  />
				    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>{data}</Text>
				</View>
			)
		}
		else if(this.state.isNull){
			return (
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-170,}}>
				    <Icon name="ios-folder-outline" color="#ccc"size={70}  />
				    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>{data}</Text>
				</View>
			)
		}
        else{
		return (
		    <TouchableOpacity  activeOpacity={0.8} style={{paddingTop:15,paddingBottom:15,backgroundColor:'#fff',marginTop:10,flexDirection:'column',paddingLeft:15}}>

           <View style={{flexDirection:'row',}}>
            <View style={{flexDirection:'column'}}>
              <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#555'}}>{data.title}</Text>
              <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,marginTop:3}}>{data.time} -- {data.endtime}</Text>
              <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,marginTop:3}}>负责人: {data.uidName}</Text>
              <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,marginTop:3}}>所属项目: {data.pro_name}</Text>
            </View>
           </View>

           <View style={{position:'absolute',right:15,top:40}}>
             <Image source={require('../imgs/right.png')} style={{width: 20, height: 18,}} />
           </View>

			</TouchableOpacity>
			)
		}
	  }

	  _renderFooter() {
		 if(this.state.isLoadMore){
			 return (
				<View style={styles.footer}>
					<ActivityIndicator color="#4385f4"/>
					<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.footerTitle}>正在加载更多……</Text>
				</View>
		  )
		 }


	  }

	   // 下拉刷新
     _onRefresh() {
 		 this.setState({
 			   isRefreshing:true,
 			   isReach:false,
 			   isLoadMore:false,
                p:1,
 		  })
 		  var that=this
 		    fetch('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=my_task_list&p=1&access_token=' + data.data.token + '', {
 						  method: 'POST',
 						  headers: {
 							'Content-Type': 'application/x-www-form-urlencoded',
 						  },
 						  body: this.toQueryString({
 							'option': 15,
              'cid':this.state.cid,
              'uid':this.state.uid,
 						  })
 						})
 						.then(function (response) {
 							return response.json();
 						})
 						.then(function (result) {
 							  datax=[];
 							  array=[];
 							  array.length = 0;
 							  aa=[];
 							  aa.length=0;
 							  if(result.list.data != null){
 								   result.list.data.forEach((Data,i) => {
 									   datax.push(Data.id);
 									   key={i}

 									   array.push(Data);

 								   })
 								  }
 							      if(result.list.count <= 10){
 									   that.setState({
 										   isReach:true,
 										   isLoadMore:false,

 									   })
 								  }
 								  if(result.list.count == 0){
 								  that.setState({
 										   dataSource: that.state.dataSource.cloneWithRows(['暂无数据']),
 										   loaded: true,
 										   sx:false,
 										   isLoadMore:false,
 										   isRefreshing:false,
 										   isReach:true,
 										   isNull:true,
 									   })
 								  }else if(array.length > result.list.count){

 									   that.setState({
 										   isReach:true,
 										   isLoadMore:false,
 										   isNull:false,
 									   })
 								   }else{
 									   that.setState({
 										   dataSource: that.state.dataSource.cloneWithRows(array),
 										   loaded: true,
 										   sx:false,
 										   isRefreshing:false,
 										   isNull:false,
 									   })

 								   }


 						})
 			            .catch((error) => {
 					that.setState({

 						   loaded: true,
 						   sx:true,
 						   isReach:true,
                            isRefreshing:false,
 						   dataSource: that.state.dataSource.cloneWithRows(['加载失败，请下拉刷新']),

 					   })

 				  });

 	  }

 	  _onEndReach() {

 		  if(!this.state.isReach){
 			  this.setState({
 				  isLoadMore:true,
 				  p:this.state.p+1,
 			  })
 			 InteractionManager.runAfterInteractions(() => {
 				   this.fetchData('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=my_task_list&access_token=' + data.data.token + '&p='+this.state.p);
 			})
 		  }


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
  card1: {
    height:45,
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

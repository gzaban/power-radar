import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
	Dimensions
} from 'react-native';

import { VictoryPie, VictoryAnimation, VictoryLabel   } from "victory-native";
import Svg from 'react-native-svg';
const { width } = Dimensions.get('window');


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

	constructor() {
		super();
		this.state = {
			percent: 25, data: this.getData(0)
		};
	}

	getData(percent) {
		return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
	}

	componentDidMount() {
		let percent = 25;
		this.setStateInterval = window.setInterval(() => {
			percent += (Math.random() * 25);
			percent = (percent > 100) ? 0 : percent;
			this.setState({
				percent, data: this.getData(percent)
			});
		}, 2000);
	}

	componentWillUnmount() {
		window.clearInterval(this.setStateInterval);
	}


	render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
			<Text>Tzaban Residence</Text>
	          <Text>Zevulun St 20, Tel Aviv Yafo</Text>
          </View>
	   <Svg viewBox="0 0 400 400" height={400} width={width}>
		        <VictoryPie
			        standalone={false}
			        animate={{ duration: 1000 }}
			        width={400} height={400}
			        data={this.state.data}
			        innerRadius={120}
			        cornerRadius={25}
			        labels={() => null}
			        style={{
				        data: { fill: (d) => {
						        const color = d.y > 30 ? "green" : "red";
						        return d.x === 1 ? color : "transparent";
					        }
				        }
			        }}
		        />
		        <VictoryAnimation duration={1000} data={this.state}>
			        {(newProps) => {
				        return (
					        <VictoryLabel
						        textAnchor="middle" verticalAnchor="middle"
						        x={200} y={200}
						        text={`${Math.round(newProps.percent)}%`}
						        style={{ fontSize: 45 }}
					        />
				        );
			        }}
		        </VictoryAnimation>
	        </Svg>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

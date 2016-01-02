
# React Native GridView

### Screenshot

![](http://i.imgur.com/kFVwxeT.png)


## Installation


Use NPM

```sh
npm install rn-grid-view --save
```


### Basic Example


```js
var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
} = React;

var GridView = require('rn-grid-view');


var Books = React.createClass({

  getInitialState: function() {
    return {
             books : {
                      "Finished Reading": [
                                           {
                                            id: 1,
                                            image: "http://i.imgur.com/4KfXDqX.png"
                                           }
                                          ],
                     }
           }
  },


  _renderBook: function(item) {
    return (
            <View key={item.id}>
              <Image
                style={styles.thumb}
                source={{uri: item.image}} />
            </View>
           )
  },


  _renderHeader: function(data, id) {
    return (<View style={styles.header}>
              <Text style={styles.headerText}>{id}</Text>
            </View>);
  },


  render: function() {

    // All available props
    return (
            <GridView
              itemsPerRow={4}
              renderFooter={null}
              onEndReached={null}
              scrollEnabled={true}
              renderSeparator={null}
              style={{marginTop: 10}}
              items={this.state.books}
              fillIncompleteRow={false}
              renderItem={this._renderBook}
              renderSectionHeader={this._renderHeader}
              automaticallyAdjustContentInsets={false} />
           )
  },

});


var styles = StyleSheet.create({
  thumb: {
    width: 90,
    height: 140,
    resizeMode: 'cover',
    margin: 1,
  },
  header: {
    backgroundColor: '#1CC839',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
    marginBottom: 5,
    marginTop: 5,
    color: "white",
  },
});
```

## License: MIT

'use strict';

import React, { Component } from 'react';

import {
  View,
  ListView,
  StyleSheet,
} from 'react-native';


var GridView = React.createClass({

  getInitialState: function() {
    return {
            items: {},
            style: {},
            itemsPerRow: 1,
            renderItem: null,
            onEndReached: null,
            scrollEnabled: true,
            renderSeparator: null,
            fillIncompleteRow: false,
            renderSectionHeader: null,
            automaticallyAdjustContentInsets: false
           };
  },


  createGroup: function(items, itemsPerRow) {
    var group = [];
    var itemGroups = [];

    items.forEach(function(item) {
      if (group.length === itemsPerRow) {
        itemGroups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });

    if (group.length > 0) {
      if (this.props.fillIncompleteRow === true) {
        while (group.length < itemsPerRow) {
          group.push(null);
        }
      }
      itemGroups.push(group);
    }

    return itemGroups;
  },


  groupItems: function(items, hasHeaders, itemsPerRow) {
    if (hasHeaders) {
      var data = {};

      for(var i in items) {
        data[i] = this.createGroup(items[i], itemsPerRow);
      }

      return data;
    }

    return this.createGroup(items, itemsPerRow);
  },


  renderRowGroup: function(group, sectionID, rowID) {
    var self = this;
    var items = group.map(function(item) {
      return self.props.renderItem(item);
    });

    return (
            <View style={styles.row}>
              {items}
            </View>
           );
  },


  render: function() {
    var dsContent = null;
    var hasHeaders = !Array.isArray(this.props.items);
    var groups = this.groupItems(this.props.items,
                                 hasHeaders,
                                 this.props.itemsPerRow);
    var ds = new ListView.DataSource({
                                      rowHasChanged: (r1, r2) => r1 !== r2,
                                      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
                                     });

    if(hasHeaders) {
      dsContent = ds.cloneWithRowsAndSections(groups);
    } else {
      dsContent = ds.cloneWithRows(groups);
    }

    return (
            <ListView
              dataSource={dsContent}
              style={this.props.style}
              renderRow={this.renderRowGroup}
              renderFooter={this.props.renderFooter}
              onEndReached={this.props.onEndReached}
              scrollEnabled={this.props.scrollEnabled}
              renderSeparator={this.props.renderSeparator}
              renderSectionHeader={this.props.renderSectionHeader}
              automaticallyAdjustContentInsets={this.props.automaticallyAdjustContentInsets} />
           );
  },

});



var styles = StyleSheet.create({
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
});


module.exports = GridView;

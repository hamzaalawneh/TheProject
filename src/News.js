import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {SvgUri} from 'react-native-svg';

export default function News(props) {
  const [data] = useState(props?.route?.params.data);
  const [flag] = useState(props?.route?.params.flag);

  return (
    <ScrollView
      style={{
        width: '100%',
        backgroundColor: 'red',
      }}>
      <SvgUri
        style={{alignSelf: 'center', marginTop: 10}}
        width={150}
        height={100}
        uri={flag}
      />
      {data?.articles.map((theData, index) => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width: '90%',
            marginTop: 30,
          }}
          key={index}>
          <Text style={{color: 'yellow'}}>{theData.title}</Text>
          <Text style={{color: 'white'}}>{theData.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
